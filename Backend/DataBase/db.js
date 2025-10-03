import mongoose from "mongoose";

const database_connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/movieBooking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

export default database_connection;
