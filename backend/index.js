import express from "express"
import connectDB from './config/db.js';
import cors from "cors";
import dotenv from "dotenv"
import { userRouter } from './Routers/userRouter.js';
import { questionRouter } from './Routers/questionRouter.js';
import { resultRouter } from "./Routers/resultRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get("/",(req,res)=>{
    res.send("Api working");
})

app.use("/api",userRouter);
app.use("/api",questionRouter);
app.use("/api",resultRouter);

app.get('/protected',  async (req, res) => {
    res.json({success:true,message:"Api working"})
})

app.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
})

