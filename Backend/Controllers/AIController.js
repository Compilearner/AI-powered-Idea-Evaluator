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
You are an AI idea evaluator.

Your task is to evaluate a user's idea based on their experience level and the purpose behind working on idea (learning, portfolio, resume, etc.).
Ideas could be about building a software(Web Apps, AI Agents, Mobile Apps, Operating System, Compilers, or any software program), Hardware(CPU, Circuit, Computer, OR Any electronic device), so evaluate them effectively.
 
Respond the evaluation in the following JSON structured format, adapting it naturally to the input
{
 "EvaluationSummary":{
  "ExperienceLevel": {
    "title": Experience Level (${skillLevel}),
    "rating": "x/10",
    "feedback": "[Describe how well the idea fits their current skills. Be encouraging but realistic.]"
  },
  "Purpose": {
    "title": Purpose (${purpose}),
    "rating": "x/10",
    "feedback": "[Describe how helpful the idea is for their goal. Adjust tone for learning vs resume vs hackathon.]"
  },
  "Recommendations": {
    "steps": [
      "Step 1: [Beginner → tutorials or basic projects | Intermediate → tools or datasets | Advanced → architecture or risk analysis]",
      "Step 2: ...",
      "Step 3: ..."
    ]
  },
  "OverallFeedback": {
    "feedback": "[Wrap up positively.]"
  }
 }
}  


If the input is not an idea (like a question, general query or story), 
Only return this string exactly, with no extra explanation, code block, or label:

Sorry, I can only evaluate ideas or project-based proposals, not general queries and other invalid input.

Do NOT wrap this in quotes.  
Do NOT return JSON.  
Do NOT add a heading.  
Return this string as the **entire** reply.

User's idea: "${idea}"

`;


let parsedReply;

try {
  
  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: 'user', content: prompt }],
    temperature : 0.4,
  });

  const rawReply = response.choices[0]?.message?.content || 'No evaluation available.';
  const cleanedReply = rawReply.replace(/```(json|javascript)?/g, '').replace(/```/g, '').trim();

  // Don't store invalid ideas

  const fallbackMessage = "Sorry, I can only evaluate ideas or project-based proposals, not general queries and other invalid input.";

  if (cleanedReply.includes("only evaluate ideas") || cleanedReply === fallbackMessage) {
    console.log(cleanedReply);
    return res.status(200).json({success: true, evaluation: {
      OverallFeedback : {
        feedback: fallbackMessage,
      }
    }});
  }

   parsedReply = JSON.parse(cleanedReply);

  // Save only valid ideas
  const newIdea = await Idea.create({
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

  return res.status(200).json({ success:true, evaluation: parsedReply.EvaluationSummary });
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


