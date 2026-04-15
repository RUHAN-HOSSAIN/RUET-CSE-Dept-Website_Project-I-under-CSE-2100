/*
  mouController.js — মউ (MOU) সম্পর্কিত হ্যান্ডলার
  এই ফাইলে MOU এন্ট্রিগুলোর CRUD অপারেশন আছে; ছবি ব্যবস্থাপনা Cloudinary-র মাধ্যমে করা হয়।
*/
import Mou from '../models/Mou.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

/* getMous: MOU তালিকা প্রদান করে — পেজিং, সার্চ এবং ঐচ্ছিক তারিখ ফিল্টার সহ */
export const getMous = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = '', from = '', to = '' } = req.query

    const query = {}
    if (search) query.$text = { $search: search }
    if (from || to) {
      query.createdAt = {}
      if (from) query.createdAt.$gte = new Date(from)
      if (to) query.createdAt.$lte = new Date(`${to}T23:59:59.999Z`)
    }

    const pageNum  = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)))
    const skip     = (pageNum - 1) * limitNum

    const [mous, total] = await Promise.all([
      Mou.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).select('-imgPublicId'),
      Mou.countDocuments(query),
    ])

    res.json({ mous, total, currentPage: pageNum, totalPages: Math.ceil(total / limitNum) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMouById = async (req, res) => {
  /* getMouById: ID onujayi ekta MOU record return kore */
  try {
    const item = await Mou.findById(req.params.id).select('-imgPublicId')
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createMou = async (req, res) => {
  /* createMou: Notun MOU create kore; image Cloudinary te upload kore */
  try {
    const { title, description } = req.body

    if (!title?.trim())       return res.status(400).json({ message: 'Title is required' })
    if (!description?.trim()) return res.status(400).json({ message: 'Description is required' })
    if (!req.file)            return res.status(400).json({ message: 'Image is required' })

    const result = await uploadToCloudinary(req.file.buffer, {
      folder:        'ruet-cse/mou',
      resource_type: 'image',
      public_id:     `mou_${Date.now()}`,
      type:          'upload',
      access_mode:   'public',
    })

    const mou = await Mou.create({
      title:       title.trim(),
      description: description.trim(),
      imgURL:      result.secure_url,
      imgPublicId: result.public_id,
    })

    res.status(201).json(mou)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateMou = async (req, res) => {
  /* updateMou: Existing MOU update kore; image replace korle purono delete kore */
  try {
    const mou = await Mou.findById(req.params.id)
    if (!mou) return res.status(404).json({ message: 'MOU not found' })

    const { title, description } = req.body
    if (!title && !description && !req.file)
      return res.status(400).json({ message: 'Nothing to update' })

    if (title)       mou.title       = title.trim()
    if (description) mou.description = description.trim()

    if (req.file) {
      await cloudinary.uploader.destroy(mou.imgPublicId, { resource_type: 'image' })
      const result = await uploadToCloudinary(req.file.buffer, {
        folder:        'ruet-cse/mou',
        resource_type: 'image',
        public_id:     `mou_${Date.now()}`,
        type:          'upload',
        access_mode:   'public',
      })
      mou.imgURL      = result.secure_url
      mou.imgPublicId = result.public_id
    }

    await mou.save()
    res.json(mou)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteMou = async (req, res) => {
  /* deleteMou: MOU and its Cloudinary image delete kore */
  try {
    const mou = await Mou.findById(req.params.id)
    if (!mou) return res.status(404).json({ message: 'MOU not found' })

    await cloudinary.uploader.destroy(mou.imgPublicId, { resource_type: 'image' })
    await mou.deleteOne()

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}