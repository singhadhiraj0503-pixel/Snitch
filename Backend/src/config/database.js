import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to the database", error);
    throw error;
  }
};

export default connectToDatabase;
