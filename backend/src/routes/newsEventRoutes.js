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
