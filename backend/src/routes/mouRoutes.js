/*
  mouRoutes.js — MOU রুটসমূহ
  MOU এন্ট্রিগুলোর CRUD এন্ডপয়েন্ট এখানে সংজ্ঞায়িত করা হয়েছে।
  অ্যাডমিন রুটগুলো সুরক্ষিত এবং ছবির আপলোডে multer/Cloudinary ব্যবহৃত হয়।
*/
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