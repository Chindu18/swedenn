import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const database_connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

export default database_connection;
