/*
  নোটিশ মডেল
  - ফিল্ডসমূহ: title, category (অ্যারে), pdfURL, pdfPublicId
  - ক্যাটাগরি অ্যারে হওয়া আবশ্যক এবং কমপক্ষে একটি ক্যাটাগরি থাকা জরুরি
  - PDF নোটিশ সংরক্ষণের জন্য; ইনডেক্সগুলো সার্চ ও সর্টিংয়ে সাহায্য করে
*/
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