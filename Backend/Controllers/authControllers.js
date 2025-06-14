import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Feed from "../Models/feedSchema.js";


dotenv.config();

export const registerUser = async(req, res)=>{
    try{
    const {userName, email, password} = req.body;

    if(!userName || !email || !password){
         return res.status(400).json({success : false, message:"All fileds are required"});
    }

    // Create new User and saving its data to database
    const newUser = new User({userName, email, password});
    await newUser.save();
    console.log(newUser);

    // Generate JWT Tokens
    const token = jwt.sign({userId:newUser._id}, process.env.TOKEN_KEY, {expiresIn: "1d"});
    res.cookie("token", token, {
        httpOnly:true,
        // secure: 
    });

    return res.status(200).json({success : true, message:"User registered Successfully",newUser});
    }catch(err){
        console.log(err);
        return res.status(500).json({ success : false, message:"Internal Server Error"});
    }
}


export const loginUser = async(req, res)=>{
    try{
    const { email, password} = req.body;

    const user = await User.findOne({email});

    // Checking in Database for credentials
    if(!user)
        return res.status(400).json({success:false, message: "Invalid password or email"});

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return  res.status(400).json({success:false, message: "Invalid password or email"});
    }

    // Generate JWT Tokens
    const token = jwt.sign({userId:user._id, userName: user.userName}, process.env.TOKEN_KEY, {expiresIn:"1d"});
    res.cookie("token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production" 
    });

    return res.status(200).json({success:true, message:"User Login Successfully", user});
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }
}


export const logoutUser = async (req, res)=>{
    res.clearCookie("token",{
        httpOnly:true,
    })

    return res.status(200).json({success:true, message: "Logout Successfully"});
}

// Middleware to verify tokens for access any page 
// Token from cookie
export const verifyToken = async (req,res,next)=>{
  const token = req.cookies.token;  
  
  if(!token){
    return res.status(401).json({success:false, message:"Token Missing"});
  }

  try{
     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
     req.user = decoded;  // Actual User info hidden inside the token
     next();
  }catch(err){
       return res.status(403).json({success:false, message:"Invalid or expired token"});
  }

} 


export const feedback = async (req, res)=>{
   try{
       const {main, suggestion} = req.body;

       if(!main)
          return res.status(400).json({success: false, message:"Main field is required"});

       const feed = new Feed({main, suggestion});
       await feed.save();
       console.log(feed);

       res.status(200).json({success: true, message:"Feedback Submitted, Thankyouu!!"});
   }catch(err){
    console.log(err);
    res.status(500).json({success: false, message:"Internal server error"});
   }

}
