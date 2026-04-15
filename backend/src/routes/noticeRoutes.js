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
