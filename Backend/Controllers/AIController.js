import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
import Idea from '../Models/ideaSchema.js';
import mongoose from 'mongoose';
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
You are an expert at evaluating startup or project ideas, product inventions and similar proposals.

If the user input is not an idea--if it is a general question, factual query or anything not resembling an idea or leading to a product---respond with:
"Sorry, I can only evaluate ideas or similar inventions, not other types of input."

For example:
(1) User's idea: What is Dijkstra's algorithm?
    AI: Sorry, I can only evaluate ideas or inventions, not other types of input.

(2) User's idea: You know, what I did today in my school?
    AI: Sorry, I can only evaluate ideas or inventions, not other types of input.

(3) User's idea: A mobile app that connects volunteers with nearby NGOs.
    AI: That's a thoughtful idea. Evaluation starts...

(4) User's idea: I have a thought to work on building an AI-enhanced robot to help in my errands daily.
    AI: That's a thoughtful idea. Evaluation starts...

Evaluate the user's idea and provide a concise, helpful response (friendly tone) tailored to them. Use the following private evaluation criteria (do NOT mention these in the output):

1. Mark the rating based on the user's skill level: "${skillLevel}".
   - Output response could be changed based on skill and purpose, so dynamically handle those situations.

2. Consider the user's purpose for evaluation: "${purpose}".
   - Adapt your response based on the purpose (e.g., learning, resume, hackathon).

3. Assess the uniqueness and real-world impact of the idea.
   - If the idea is unique, moderately unique, common, or impactful, mention that briefly.

4. Provide answers to these internal guiding questions to shape the response (do NOT show them to the user):
   - Does it solve a real problem or is it just minimal?
   - Is this a good project to work on for their stage?
   - Is it good for their resume?
   - How could this be built or approached technically?

5. Give a final evaluation summary in 4 sentences.

6. Provide a score out of 10 (based on idea quality, skill level, impact, user's purpose, and feasibility).

7. If the score is above 6, motivate the user positively to pursue the idea.

Respond ONLY in the following JSON format:

if(idea is not a valid input)
  {
    "ans": "Sorry, I can only evaluate ideas or similar inventions, not other types of input."
  }
else {
  {
    "summary": "...",
    "technicalSuggestion": "...",
    "realWorldImpact": "...",
    "resumeValue": "...",
    "score": 8,
    "motivation": "This sounds promising! You should definitely start working on it."
  }
}

User's idea:
"${idea}"
`;

let parsedReply;

try {
  
  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: 'user', content: prompt }],
  });

  const rawReply = response.choices[0]?.message?.content || 'No evaluation available.';
  const cleanedReply = rawReply.replace(/```json|```/g, '').trim();

   parsedReply = JSON.parse(cleanedReply);

  // Don't store invalid ideas
  if (parsedReply.ans === "Sorry, I can only evaluate ideas or similar inventions, not other types of input.") {
    return res.status(200).json({ evaluation: parsedReply });
  }

  // Save only valid ideas
  const newIdea = new Idea({
    description: idea,
    userId: userID,
  });

  await newIdea.save();

  
  } catch (error) {
    if(error.code === 11000){
      console.log("Duplicate idea---Skipping save");
  
    }else{
      console.error(error.response?.data || error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(200).json({ evaluation: parsedReply });
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


export const deleteIdea = async (req, res)=>{
     const {id} = req.params;

      // Handle invalid Product ID
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false , message:" Invalid Idea ID"}); 
    }

    try{
      await Idea.findByIdAndDelete(id);
      res.status(200).json({success:true, message: "Idea was deleted successfully"});

    }catch(err){
      console.log(err);
      res.status(500).json({success: false , message:"Server Error"});
    }
}


