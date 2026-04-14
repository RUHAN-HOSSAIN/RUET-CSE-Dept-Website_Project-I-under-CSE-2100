import express from "express";
import {
  getNewsEvents,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsEventController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getNewsEvents);
router.post("/", upload.single("image"), createNewsEvent);
router.put("/:id", upload.single("image"), updateNewsEvent);
router.delete("/:id", deleteNewsEvent);
// router.post('/',    protect, upload.single('image'), createNewsEvent)
// router.put('/:id',  protect, upload.single('image'), updateNewsEvent)
// router.delete('/:id', protect,                       deleteNewsEvent)

export default router;
