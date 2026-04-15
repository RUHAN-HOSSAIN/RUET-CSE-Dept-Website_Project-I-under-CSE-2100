import express from "express";
import {
  getMous,
  getMouById,
  createMou,
  updateMou,
  deleteMou,
} from "../controllers/mouController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',       getMous)
router.get('/:id',    getMouById)
router.post('/',      protect, upload.single('image'), createMou)
router.put('/:id',    protect, upload.single('image'), updateMou)
router.delete('/:id', protect,                         deleteMou)

export default router;