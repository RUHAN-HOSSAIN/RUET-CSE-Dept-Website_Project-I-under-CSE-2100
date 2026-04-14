import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/cloudinary.js";

import noticeRoutes from "./routes/noticeRoutes.js";
import newsEventRoutes from "./routes/newsEventRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import campusLifeRoutes from "./routes/campusLifeRoutes.js";
import mouRoutes from "./routes/mouRoutes.js";
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))

app.use('/api/auth', authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/news-events", newsEventRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/campus-life", campusLifeRoutes);
app.use("/api/mous", mouRoutes);

app.get("/", (req, res) => res.send("API running..."));

export default app;
