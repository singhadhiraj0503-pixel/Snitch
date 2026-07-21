import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import authRouter from "./router/auth.routes.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running successfully" });
});

app.use("/api/auth", authRouter);

export default app;
