import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import {
  getMe,
  googleCallback,
  login,
  register,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, register);

authRouter.post("/login", validateLoginUser, login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback,
);

authRouter.get("/me", authenticateUser, getMe);

export default authRouter;
