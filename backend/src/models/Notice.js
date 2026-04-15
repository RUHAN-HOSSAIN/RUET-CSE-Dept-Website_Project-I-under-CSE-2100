import mongoose from 'mongoose'

const NOTICE_CATEGORIES = ['Academic','Administrative', 'Admission', 'Announcement', 'Exam', 'General', 'Undergraduate', 'Postgraduate']

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: true,
      trim:     true,
    },
    category: {
      type:     [String],
      required: true,
      enum:     NOTICE_CATEGORIES,
      validate: {
        validator: v => Array.isArray(v) && v.length > 0,
        message:   'At least one category is required',
      },
    },
    pdfURL: {
      type:     String,
      required: true,
    },
    pdfPublicId: {
      type:     String,
      required: true,
    },
  },
  { timestamps: true }
)

noticeSchema.index({ title: 'text' });
noticeSchema.index({ category: 1, createdAt: -1 });
noticeSchema.index({ createdAt: -1 });

export default mongoose.model('Notice', noticeSchema)