import CampusLife from '../models/CampusLife.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

export const getCampusLifes = async (req, res) => {
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

    const [campusLifes, total] = await Promise.all([
      CampusLife.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).select('-imgPublicId'),
      CampusLife.countDocuments(query),
    ])

    res.json({ campusLifes, total, currentPage: pageNum, totalPages: Math.ceil(total / limitNum) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const getCampusLifeStats = async (req, res) => {
  try {
    const results = await CampusLife.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const stats = {}
    results.forEach(r => { stats[r._id] = r.count })
    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const createCampusLife = async (req, res) => {
  try {
    const { title, description, category } = req.body

    if (!title?.trim())       return res.status(400).json({ message: 'Title is required' })
    if (!description?.trim()) return res.status(400).json({ message: 'Description is required' })
    if (!category)            return res.status(400).json({ message: 'Category is required' })
    if (!req.file)            return res.status(400).json({ message: 'Image is required' })

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ruet-cse/campus-life', resource_type: 'image',
      public_id: `campus_life_${Date.now()}`, type: 'upload', access_mode: 'public',
    })

    const campusLife = await CampusLife.create({
      title: title.trim(), description: description.trim(),
      category, imgURL: result.secure_url, imgPublicId: result.public_id,
    })

    res.status(201).json(campusLife)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateCampusLife = async (req, res) => {
  try {
    const campusLife = await CampusLife.findById(req.params.id)
    if (!campusLife) return res.status(404).json({ message: 'Campus life entry not found' })

    const { title, description, category } = req.body
    if (!title && !description && !category && !req.file)
      return res.status(400).json({ message: 'Nothing to update' })

    if (title)       campusLife.title       = title.trim()
    if (description) campusLife.description = description.trim()
    if (category)    campusLife.category    = category

    if (req.file) {
      await cloudinary.uploader.destroy(campusLife.imgPublicId, { resource_type: 'image' })
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'ruet-cse/campus-life', resource_type: 'image',
        public_id: `campus_life_${Date.now()}`, type: 'upload', access_mode: 'public',
      })
      campusLife.imgURL      = result.secure_url
      campusLife.imgPublicId = result.public_id
    }

    await campusLife.save()
    res.json(campusLife)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteCampusLife = async (req, res) => {
  try {
    const campusLife = await CampusLife.findById(req.params.id)
    if (!campusLife) return res.status(404).json({ message: 'Campus life entry not found' })

    await cloudinary.uploader.destroy(campusLife.imgPublicId, { resource_type: 'image' })
    await campusLife.deleteOne()

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}