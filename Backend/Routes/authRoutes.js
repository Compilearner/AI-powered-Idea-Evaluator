import express from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/authControllers.js";


const router = express.Router();

router.post("/registerUser", registerUser );

router.post("/loginUser", loginUser );

router.post("/logoutUser", logoutUser );


export default router;