import NewsEvent from '../models/NewsEvent.js'
import { uploadToCloudinary, cloudinary } from '../config/cloudinary.js'

// GET /api/news-events?page=1&limit=12&search=...&category=event&from=...&to=...
export const getNewsEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      category = '',
      from = '',
      to = '',
    } = req.query

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

    const [newsEvents, total] = await Promise.all([
      NewsEvent.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select('-imgPublicId'),
      NewsEvent.countDocuments(query),
    ])

    res.json({
      newsEvents,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// GET /api/news-events/stats
export const getNewsEventStats = async (req, res) => {
  try {
    const results = await NewsEvent.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const stats = {}
    results.forEach(r => { stats[r._id] = r.count })
    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// POST
export const createNewsEvent = async (req, res) => {
  try {
    const { title, description, category } = req.body

    if (!title?.trim())       return res.status(400).json({ message: 'Title is required' })
    if (!description?.trim()) return res.status(400).json({ message: 'Description is required' })
    if (!category)            return res.status(400).json({ message: 'Category is required' })
    if (!req.file)            return res.status(400).json({ message: 'Image is required' })

    const result = await uploadToCloudinary(req.file.buffer, {
      folder:        'ruet-cse/news-events',
      resource_type: 'image',
      public_id:     `news_event_${Date.now()}`,
      type:          'upload',
      access_mode:   'public',
    })

    const newsEvent = await NewsEvent.create({
      title:       title.trim(),
      description: description.trim(),
      category,
      imgURL:      result.secure_url,
      imgPublicId: result.public_id,
    })

    res.status(201).json(newsEvent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT
export const updateNewsEvent = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id)
    if (!newsEvent) return res.status(404).json({ message: 'News/Event not found' })

    const { title, description, category } = req.body

    if (!title && !description && !category && !req.file)
      return res.status(400).json({ message: 'Nothing to update' })

    if (title)       newsEvent.title       = title.trim()
    if (description) newsEvent.description = description.trim()
    if (category)    newsEvent.category    = category

    if (req.file) {
      await cloudinary.uploader.destroy(newsEvent.imgPublicId, {
        resource_type: 'image',
      })
      const result = await uploadToCloudinary(req.file.buffer, {
        folder:        'ruet-cse/news-events',
        resource_type: 'image',
        public_id:     `news_event_${Date.now()}`,
        type:          'upload',
        access_mode:   'public',
      })
      newsEvent.imgURL      = result.secure_url
      newsEvent.imgPublicId = result.public_id
    }

    await newsEvent.save()
    res.json(newsEvent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
export const deleteNewsEvent = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id)
    if (!newsEvent) return res.status(404).json({ message: 'News/Event not found' })

    await cloudinary.uploader.destroy(newsEvent.imgPublicId, {
      resource_type: 'image',
    })
    await newsEvent.deleteOne()

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}