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

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "Image-kit private key not defined in the environment variables",
  );
}

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error(
    "Razorpay key id is not defined in the environment variables",
  );
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "Razorpay key secret is not defined in the environment variables",
  );
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};
