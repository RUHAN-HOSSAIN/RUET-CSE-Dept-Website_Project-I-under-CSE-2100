/*
	newsEventRoutes.js — নিউজ ও ইভেন্ট রুটসমূহ
	এখানে HTTP এন্ডপয়েন্টগুলো নিউজ/ইভেন্ট কন্ট্রোলার হ্যান্ডলারের সাথে ম্যাপ করা আছে।
	অ্যাডমিন অপারেশনের জন্য `protect` এবং ছবির জন্য `upload` ব্যবহার করা হয়।
*/
import express from "express";
import { getNewsEvents, getNewsEventStats, getNewsEventById, createNewsEvent, updateNewsEvent, deleteNewsEvent } from '../controllers/newsEventController.js'
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/stats', getNewsEventStats);
router.get("/", getNewsEvents);
router.get('/:id', getNewsEventById)
router.post('/',    protect, upload.single('image'), createNewsEvent)
router.put('/:id',  protect, upload.single('image'), updateNewsEvent)
router.delete('/:id', protect,                       deleteNewsEvent)

export default router;
