/*
  ক্যাম্পাস লাইফ মডেল
  - ফিল্ডসমূহ: title, description, category (enum), imgURL, imgPublicId
  - ইভেন্ট, ক্লাব, ক্রীড়া ইত্যাদি ক্যাম্পাস লাইফ পোস্টগুলোর জন্য ব্যবহার করা হয়
*/
import mongoose from 'mongoose'

const CATEGORIES = ['Sports', 'Cultural', 'Club', 'General']

const campusLifeSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: true,
      trim:     true,
    },
    description: {
      type:     String,
      required: true,
      trim:     true,
    },
    category: {
      type:     String,
      required: true,
      enum:     CATEGORIES,
    },
    imgURL: {
      type:     String,
      required: true,
    },
    imgPublicId: {
      type:     String,
      required: true,
    },
  },
  { timestamps: true }
)

campusLifeSchema.index({ title: 'text', description: 'text' })
campusLifeSchema.index({ category: 1, createdAt: -1 })

export default mongoose.model('CampusLife', campusLifeSchema)