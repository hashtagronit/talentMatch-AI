const express = require('express');
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");
const cors = require("cors");



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



module.exports= app