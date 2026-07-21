import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authRouter from "./router/auth.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully" });
});

app.use("/api/auth", authRouter);

export default app;
