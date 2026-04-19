/*
  app.js — Express অ্যাপ্লিকেশন কনফিগারেশন
  এই ফাইলটিতে অ্যাপ-লেভেলের middleware, রেট-লিমিটার এবং API রুট নিবন্ধন করা আছে।
  এই ফাইল কেবল অ্যাপ কনফিগার করে; সার্ভার `server.js` থেকে চালানো হয়।
*/
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

// সাধারণ রিকোয়েস্ট লিমিটার: API-তে অতিরিক্ত রিকোয়েস্ট থেকে সার্ভারকে রক্ষা করে
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 মিনিট
  limit: 300,
  message: { message: 'Too many requests, please try again later' }
})

// অথেনটিকেশন-নির্দিষ্ট লিমিটার: লগইন প্রচেষ্টাগুলো সীমিত করে
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 মিনিট
  limit: 20,
  message: { message: 'Too many login attempts, please try again later' }
})


app.use(helmet());
app.use(generalLimiter);
app.use(express.json());
// CORS origin পরিবেশভিত্তিক ভ্যারিয়েবল ব্যবহার করে কনফিগার করা হয়
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
