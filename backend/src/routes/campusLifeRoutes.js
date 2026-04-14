import express from "express";
import { getCampusLifes, getCampusLifeStats, createCampusLife, updateCampusLife, deleteCampusLife } from '../controllers/campusLifeController.js'
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/stats', getCampusLifeStats)
router.get("/", getCampusLifes);
router.post("/", upload.single("image"), createCampusLife);
router.put("/:id", upload.single("image"), updateCampusLife);
router.delete("/:id", deleteCampusLife);
// router.post('/',      protect, upload.single('image'), createCampusLife)
// router.put('/:id',    protect, upload.single('image'), updateCampusLife)
// router.delete('/:id', protect,                         deleteCampusLife)

export default router;
