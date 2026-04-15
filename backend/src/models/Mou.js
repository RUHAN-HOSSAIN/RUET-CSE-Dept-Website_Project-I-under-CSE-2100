/*
  MOU মডেল
  - ফিল্ডসমূহ: title, description, imgURL, imgPublicId
  - টাইমস্ট্যাম্পসহ MOU সম্পর্কিত এন্ট্রি সংরক্ষণ করে
*/
import mongoose from 'mongoose'

const mouSchema = new mongoose.Schema(
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

mouSchema.index({ title: 'text', description: 'text' })

export default mongoose.model('Mou', mouSchema)