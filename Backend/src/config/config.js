import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not defined in the environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret not defined in the environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Google client ID not defined in the environment variables");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Google client Secret not defined in the environment variables",
  );
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
