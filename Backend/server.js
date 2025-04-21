import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";

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
    connectDB();
    console.log("Server started at http://localhost:5000");
});
