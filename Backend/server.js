import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middlware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Connect to Database and Server
app.listen(PORT, ()=>{
    console.log("Server started");
});