import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from "compression";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middlware
app.use(cookieParser());
app.use(express.json());
app.use(cors()); // Allow all origins



// Enable compression for all responses
app.use(compression());

app.use(cors({
  origin: 'http://localhost:5173',
}));


// Routes to server
app.use("/api", authRoutes);

// Connect to Database and Server
app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");
});
