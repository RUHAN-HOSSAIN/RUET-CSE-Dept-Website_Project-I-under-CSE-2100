/*
	noticeRoutes.js — নোটিশ রুটসমূহ
	এখানে পাবলিক তালিকা এবং অ্যাডমিনের জন্য ক্রিয়েট/আপডেট/ডিলিট এন্ডপয়েন্ট আছে, PDF আপলোড সাপোর্টসহ।
*/
import express from "express";
import { getNotices, getNoticeStats, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController.js'

import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/stats', getNoticeStats);
router.get("/", getNotices);
router.post('/',       protect, upload.single('pdf'), createNotice)
router.put('/:id',     protect, upload.single('pdf'), updateNotice)
router.delete('/:id',  protect,                       deleteNotice)

export default router;
