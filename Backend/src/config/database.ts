import mongoose from "mongoose";
import { createClient } from "redis";

//this connects to the database
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
};

//this creates a redis client
const redisClient = createClient({  
  url: process.env.REDIS_URI as string,
});

//this listens for any error that may occur in redis and logs it
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export { connectDB, redisClient };