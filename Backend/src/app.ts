import express from 'express';
import authRouter from "./routes/auth.routes.js"
import interviewRouter from "./routes/interview.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";



const app=express()

app.use(express.json())
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production";
app.use(cors({
  origin: isProduction
    ? process.env.FRONTEND_URL
    : "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



export default app