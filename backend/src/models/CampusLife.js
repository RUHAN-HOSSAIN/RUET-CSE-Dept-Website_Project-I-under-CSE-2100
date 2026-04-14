import mongoose from 'mongoose'

const CATEGORIES = ['sports', 'cultural', 'club', 'general']

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