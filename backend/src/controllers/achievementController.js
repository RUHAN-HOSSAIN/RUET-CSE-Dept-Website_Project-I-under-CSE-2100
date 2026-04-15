/*
  achievementController.js — এচিভমেন্ট সম্পর্কিত হ্যান্ডলার
  এই ফাইলে এচিভমেন্ট রিসোর্সের CRUD অপারেশনগুলো আছে:
  - তালিকা (পৃষ্ঠা বিভাজন, সার্চ, ক্যাটাগরি ও তারিখ ফিল্টার)
  - আইডি অনুসারে একক আইটেম ফেরত দেওয়া
  - পরিসংখ্যান (ক্যাটাগরি অনুযায়ী গণনা)
  - তৈরি, আপডেট ও মুছে ফেলা (ছবি ব্যবস্থাপনা Cloudinary-র মাধ্যমে)
*/
import Achievement from '../models/Achievement.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

/*
  getAchievements: এচিভমেন্টের তালিকা প্রদান করে।
  পেজিং, ফুল-টেক্সট সার্চ, ক্যাটাগরি ফিল্টার এবং তারিখ রেঞ্জ সাপোর্ট আছে।
*/
export const getAchievements = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = '', category = '', from = '', to = '' } = req.query

    const query = {}
    if (search) query.$text = { $search: search }
    if (category) query.category = category
    if (from || to) {
      query.createdAt = {}
      if (from) query.createdAt.$gte = new Date(from)
      if (to) query.createdAt.$lte = new Date(`${to}T23:59:59.999Z`)
    }

    const pageNum  = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)))
    const skip     = (pageNum - 1) * limitNum

    const [achievements, total] = await Promise.all([
      Achievement.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).select('-imgPublicId'),
      Achievement.countDocuments(query),
    ])

    res.json({ achievements, total, currentPage: pageNum, totalPages: Math.ceil(total / limitNum) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAchievementById = async (req, res) => {
  /* getAchievementById: আইডি অনুযায়ী একটি এচিভমেন্ট রেকর্ড ফেরত দেয়। */
  try {
    const item = await Achievement.findById(req.params.id).select('-imgPublicId')
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAchievementStats = async (req, res) => {
  /* getAchievementStats: ক্যাটাগরি অনুযায়ী গণনা করে পরিসংখ্যান ফেরত দেয়। */
  try {
    const results = await Achievement.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const stats = {}
    results.forEach(r => { stats[r._id] = r.count })
    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createAchievement = async (req, res) => {
  /*
    createAchievement: নতুন এচিভমেন্ট তৈরি করে।
    ছবি আপলোড করতে Cloudinary হেল্পার ব্যবহার করা হয় এবং পরে ডাটাবেজে সংরক্ষণ করা হয়।
  */
  try {
    const { title, description, category } = req.body

    if (!title?.trim())       return res.status(400).json({ message: 'Title is required' })
    if (!description?.trim()) return res.status(400).json({ message: 'Description is required' })
    if (!category)            return res.status(400).json({ message: 'Category is required' })
    if (!req.file)            return res.status(400).json({ message: 'Image is required' })

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ruet-cse/achievements', resource_type: 'image',
      public_id: `achievement_${Date.now()}`, type: 'upload', access_mode: 'public',
    })

    const achievement = await Achievement.create({
      title: title.trim(), description: description.trim(),
      category, imgURL: result.secure_url, imgPublicId: result.public_id,
    })

    res.status(201).json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateAchievement = async (req, res) => {
  /*
    updateAchievement: বিদ্যমান এচিভমেন্ট আপডেট করে।
    যদি নতুন ফাইল থাকে তবে পুরনো ছবি Cloudinary থেকে মুছে ফেলা হয়।
  */
  try {
    const achievement = await Achievement.findById(req.params.id)
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' })

    const { title, description, category } = req.body
    if (!title && !description && !category && !req.file)
      return res.status(400).json({ message: 'Nothing to update' })

    if (title)       achievement.title       = title.trim()
    if (description) achievement.description = description.trim()
    if (category)    achievement.category    = category

    if (req.file) {
      await cloudinary.uploader.destroy(achievement.imgPublicId, { resource_type: 'image' })
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'ruet-cse/achievements', resource_type: 'image',
        public_id: `achievement_${Date.now()}`, type: 'upload', access_mode: 'public',
      })
      achievement.imgURL      = result.secure_url
      achievement.imgPublicId = result.public_id
    }

    await achievement.save()
    res.json(achievement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteAchievement = async (req, res) => {
  /* deleteAchievement: এচিভমেন্ট এবং সংশ্লিষ্ট ছবি মুছে ফেলে */
  try {
    const achievement = await Achievement.findById(req.params.id)
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' })

    await cloudinary.uploader.destroy(achievement.imgPublicId, { resource_type: 'image' })
    await achievement.deleteOne()

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}