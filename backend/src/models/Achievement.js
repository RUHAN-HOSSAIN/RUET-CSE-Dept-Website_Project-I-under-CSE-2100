/*
  এচিভমেন্ট মডেল
  - ফিল্ডসমূহ: title, description, category (enum), imgURL, imgPublicId
  - timestamps সক্রিয় রয়েছে
  - সার্চের জন্য title ও description-এ টেক্সট ইনডেক্স আছে
*/
import mongoose from 'mongoose'

const CATEGORIES = ['Faculty', 'Student', 'Department']

const achievementSchema = new mongoose.Schema(
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

achievementSchema.index({ title: 'text', description: 'text' })
achievementSchema.index({ category: 1, createdAt: -1 })

export default mongoose.model('Achievement', achievementSchema)