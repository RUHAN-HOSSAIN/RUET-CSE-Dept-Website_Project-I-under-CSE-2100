import Achievement from '../models/Achievement.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

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

export const getAchievementStats = async (req, res) => {
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