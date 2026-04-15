import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'
import "./config/cloudinary.js";

import noticeRoutes from "./routes/noticeRoutes.js";
import newsEventRoutes from "./routes/newsEventRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import campusLifeRoutes from "./routes/campusLifeRoutes.js";
import mouRoutes from "./routes/mouRoutes.js";
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 মিনিট
  limit: 100,
  message: { message: 'Too many requests, please try again later' }
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 মিনিট
  limit: 20,
  message: { message: 'Too many login attempts, please try again later' }
})


app.use(helmet());
app.use(generalLimiter);
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))

app.use('/api/auth', authLimiter, authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/news-events", newsEventRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/campus-life", campusLifeRoutes);
app.use("/api/mous", mouRoutes);

app.get("/", (req, res) => res.send("API running..."));

export default app;
