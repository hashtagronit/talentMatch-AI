import "dotenv/config";
import app from "./app.js";
import { connectDB, redisClient } from "./config/database.js";

const startServer = async () => {
  try {
    //this connects to the database
    await connectDB();
    console.log("MongoDB connected");

    //this connects to the redis
    await redisClient.connect();
    console.log("Redis connected");

    //this starts the server only if everything works
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("Startup Error:", error);
    //exit if anything fails
    process.exit(1); 
  }
};

startServer();