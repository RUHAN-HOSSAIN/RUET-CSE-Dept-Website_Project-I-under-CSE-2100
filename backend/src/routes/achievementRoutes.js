import express from "express";
import { getAchievements, getAchievementStats, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js'

import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/stats', getAchievementStats)
router.get("/", getAchievements);
router.post("/", upload.single("image"), createAchievement);
router.put("/:id", upload.single("image"), updateAchievement);
router.delete("/:id", deleteAchievement);
// router.post('/',      protect, upload.single('image'), createAchievement)
// router.put('/:id',    protect, upload.single('image'), updateAchievement)
// router.delete('/:id', protect,                         deleteAchievement)

export default router;
