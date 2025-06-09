import express from "express";
import { feedback, loginUser, logoutUser, registerUser, verifyToken } from "../Controllers/authControllers.js";
import { deleteIdea, getIdeas, ideaEvaluation } from "../Controllers/AIController.js";


const router = express.Router();

router.post("/registerUser", registerUser );

router.post("/loginUser", loginUser );

router.post("/logoutUser", verifyToken, logoutUser );

router.post("/autoCheck", verifyToken, (req,res)=>{
    return res.status(201).json({success:true, user:req.user});
})

router.post("/evaluate-idea", verifyToken,  ideaEvaluation);

router.post("/fetchIdeas", verifyToken, getIdeas);

router.delete("/deleteIdea/:id", verifyToken, deleteIdea);

router.post("/feed",verifyToken, feedback);

export default router;