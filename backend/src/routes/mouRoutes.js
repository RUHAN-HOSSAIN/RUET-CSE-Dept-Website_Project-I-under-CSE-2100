import express from "express";
import {
  getMous,
  createMou,
  updateMou,
  deleteMou,
} from "../controllers/mouController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMous);
router.post("/", upload.single("image"), createMou);
router.put("/:id", upload.single("image"), updateMou);
router.delete("/:id", deleteMou);
// router.post('/',      protect, upload.single('image'), createMou)
// router.put('/:id',    protect, upload.single('image'), updateMou)
// router.delete('/:id', protect,                         deleteMou)

export default router;
