/*
  campusLifeController.js — ক্যাম্পাস লাইফ সম্পর্কিত হ্যান্ডলার
  এই ফাইলে ক্যাম্পাস লাইফ এন্ট্রিগুলোর CRUD অপারেশন আছে। ছবির আপলোড ও ব্যবস্থাপনা Cloudinary দ্বারা করা হয়।
*/
import CampusLife from '../models/CampusLife.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

/*
  getCampusLifes: ক্যাম্পাস লাইফ এন্ট্রির তালিকা প্রদান করে।
  পেজিং, সার্চ, ক্যাটাগরি ও তারিখ ফিল্টার সমর্থিত।
*/
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

export const getCampusLifeById = async (req, res) => {
  /* getCampusLifeById: আইডি অনুযায়ী একটি ক্যাম্পাস লাইফ এন্ট্রি ফেরত দেয় */
  try {
    const item = await CampusLife.findById(req.params.id).select('-imgPublicId')
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCampusLifeStats = async (req, res) => {
  /* getCampusLifeStats: ক্যাটাগরি অনুযায়ী গণনা করে পরিসংখ্যান দেয় */
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
  /* createCampusLife: নতুন ক্যাম্পাস লাইফ এন্ট্রি তৈরি করে; ছবি Cloudinary-তে আপলোড করা হয় */
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
  /* updateCampusLife: বিদ্যমান এন্ট্রি আপডেট করে; ছবি বদলে গেলে পুরনোটি মুছে ফেলা হয় */
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
  /* deleteCampusLife: এন্ট্রি এবং সংশ্লিষ্ট Cloudinary ছবি মুছে ফেলে */
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