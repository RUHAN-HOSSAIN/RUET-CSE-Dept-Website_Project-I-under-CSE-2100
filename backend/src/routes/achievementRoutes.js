/*
  achievementRoutes.js — এচিভমেন্ট রিসোর্সের রুট
  এন্ডপয়েন্টগুলো কন্ট্রোলার ফাংশনের সাথে ম্যাপ করা আছে।
  অ্যাডমিন অপারেশনের জন্য `protect` মিডলওয়্যার এবং ছবি আপলোডের জন্য `upload` ব্যবহার করা হয়।
*/
import express from "express";
import {
  getAchievements,
  getAchievementById,
  getAchievementStats,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", getAchievementStats);
router.get("/", getAchievements);
router.get("/:id", getAchievementById);
router.post("/", protect, upload.single("image"), createAchievement);
router.put("/:id", protect, upload.single("image"), updateAchievement);
router.delete("/:id", protect, deleteAchievement);

export default router;
