/*
  নিউজ/ইভেন্ট মডেল
  - ফিল্ডসমূহ: title, description, category (News/Event), imgURL, imgPublicId
  - টাইমস্ট্যাম্প সক্রিয় এবং সার্চের জন্য টেক্সট ইনডেক্স রয়েছে
*/
import mongoose from 'mongoose'

const CATEGORIES = ['News', 'Event']

const newsEventSchema = new mongoose.Schema(
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

newsEventSchema.index({ title: 'text', description: 'text' })
newsEventSchema.index({ category: 1, createdAt: -1 })

export default mongoose.model('NewsEvent', newsEventSchema)