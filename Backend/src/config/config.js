import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not defined in the environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret not defined in the environment variables");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
