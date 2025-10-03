import mongoose from "mongoose";

const database_connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://chinramanv:vL9weieJ9SkKKN@chin.dkhzya6.mongodb.net/movieBooking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

export default database_connection;
