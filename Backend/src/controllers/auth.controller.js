import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = async (user, res, message) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
};

export const register = async (req, res) => {
  const { email, contact, password, fullname, isSeller } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or contact already exists" });
    }

    const user = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });

    console.log("after check:", user);

    await sendTokenResponse(user, res, "User registered Successfully");
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  await sendTokenResponse(user, res, "User logged-in successdully");
};

export const googleCallback = async (req, res) => {
  console.log(req.user);

  res.redirect("http://localhost:5173/");
};
