import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
import Idea from '../Models/ideaSchema.js';
dotenv.config();

const client = new Mistral({ apiKey: process.env.MIST_KEY });

export const ideaEvaluation = async (req, res) => {

  const { idea, purpose, skillLevel, userID } = req.body;

  if (!idea || !skillLevel || !purpose) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  if(!userID)
    return res.status(400).json({ success: false, message: 'UserID is missing'});
 
const prompt = `
You are an expert at evaluating startup or project ideas.

Evaluate the user's idea and provide a concise, helpful response tailored to them. Use the following private evaluation criteria (do NOT mention these in the output):

1. Analyze the user's skill level: "${skillLevel}".
   - If skill level is "No knowledge", suggest basic technologies to start with, based on the idea.
   - You can give suggestion or advice to user, if the idea is already existing and building it from scratch will be a waste of time like building chatgpt again.
2. Consider the user's purpose: "${purpose}".
   - Adapt your response based on the purpose (e.g., learning, resume, hackathon).
3. Assess the uniqueness and real-world impact of the idea.
   - If the idea is truly unique or impactful, mention that briefly.
4. Give a final evaluation summary in 2–3 sentences.
5. Provide a score out of 10.
6. Only if the score is above 6, give a recommendation to start working on the idea.

Respond ONLY in the following JSON format:

{
  "techSuggestions": "Basic tech suggestions (if skill level is 'No knowledge') or null",
  "uniquenessImpact": "Short comment on idea uniqueness and impact or null",
  "evaluationSummary": "2-3 sentence summary of the evaluation",
  "score": number (0 to 10),
  "recommendation": "Short recommendation or null"
}

User's idea:
"${idea}"
`;

  
  try {
    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: 'user', content: prompt }],
    });

    const rawReply = response.choices[0]?.message?.content || 'No evaluation available.';
    const cleanedReply = rawReply.replace(/```json|```/g, '').trim();
    let parsedReply = {};
    parsedReply = JSON.parse(cleanedReply);

    const newIdea = new Idea({
    description: idea,
    userId: userID
   })  

    await newIdea.save();

    res.status(200).json({ evaluation : parsedReply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to connect to Mistral API' });
  }
};


export const getIdeas = async(req, res)=>{
     try{
          const {userID} = req.body;

          if(!userID)
             return res.status(400).json({ success: false, message: 'UserID is missing'});

          const ideas = await Idea.find({userId : userID}).lean();

          if(!ideas)
              return res.status(500).json({ success: false, message: 'Internal server error'});

          return res.status(201).json({ success: true, message: 'All ideas fetched successfully', ideas});

     }catch(err){
        console.log(err);
     }
}


