/*
  campusLifeRoutes.js — ক্যাম্পাস লাইফ রুটসমূহ
  এখানে HTTP ভ্যার্ব ও পাথগুলো কন্ট্রোলার হ্যান্ডলারের সাথে ম্যাপ করা আছে।
  অ্যাডমিন অপারেশনগুলোর জন্য `protect` মিডলওয়্যার এবং ছবি আপলোডের জন্য `upload` ব্যবহার করা হয়।
*/
import express from "express";
import {
  getCampusLifes,
  getCampusLifeById,
  getCampusLifeStats,
  createCampusLife,
  updateCampusLife,
  deleteCampusLife,
} from "../controllers/campusLifeController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", getCampusLifeStats);
router.get("/", getCampusLifes);
router.get("/:id", getCampusLifeById);
router.post("/", protect, upload.single("image"), createCampusLife);
router.put("/:id", protect, upload.single("image"), updateCampusLife);
router.delete("/:id", protect, deleteCampusLife);

export default router;