/*
  cloudinary.js — Cloudinary ও multer কনফিগারেশন
  এই ফাইলটিতে Cloudinary ক্রেডেনশিয়াল ব্যবহার করে কনফিগার করা আছে,
  `upload` (multer.memoryStorage) মিডেলওয়্যার এবং `uploadToCloudinary` হেল্পার প্রদান করা হয়েছে।
*/
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // ১০MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Image files (jpg, jpeg, png, webp) are allowed"), false);
    }
  },
});

// Cloudinary তে upload করার helper function
export const uploadToCloudinary = (fileBuffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(fileBuffer);
  });
};

export { cloudinary };
