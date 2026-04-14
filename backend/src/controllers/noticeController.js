import Notice from "../models/Notice.js";
import { uploadToCloudinary, cloudinary } from "../config/cloudinary.js";

// ─── GET all — public ─────────────────────────────────────────────
// GET /api/notices?page=1&limit=15&search=exam&category=Undergraduate&from=...&to=...
export const getNotices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      search = "",
      category = "",
      from = "",
      to = "",
    } = req.query;

    const query = {};

    if (search) query.$text = { $search: search };
    if (category) query.category = category; // array field এ match
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to)
        // query.createdAt.$lte = new Date(new Date(to).setHours(23, 59, 59, 999));
        query.createdAt.$lte = new Date(`${to}T23:59:59.999Z`);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [notices, total] = await Promise.all([
      Notice.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select("-pdfPublicId"),
      Notice.countDocuments(query),
    ]);

    res.json({
      notices,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET /api/notices/stats
export const getNoticeStats = async (req, res) => {
  try {
    const results = await Notice.aggregate([
      { $unwind: '$category' },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const stats = {}
    results.forEach(r => { stats[r._id] = r.count })
    res.json(stats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// ─── POST — admin ─────────────────────────────────────────────────
export const createNotice = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title?.trim())
      return res.status(400).json({ message: "Title is required" });
    if (!req.file)
      return res.status(400).json({ message: "PDF file is required" });

    // category string বা array দুটোই handle করে
    const categories = Array.isArray(category)
      ? category
      : [category].filter(Boolean);
    if (categories.length === 0)
      return res.status(400).json({ message: "Category is required" });

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "ruet-cse/notices",
      resource_type: "raw",
      public_id: `notice_${Date.now()}`,
      format: "pdf",
      type: "upload",
      access_mode: 'public',
    });

    const notice = await Notice.create({
      title: title.trim(),
      category: categories,
      pdfURL: result.secure_url,
      pdfPublicId: result.public_id,
    });

    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── PUT — admin ──────────────────────────────────────────────────
export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    const { title, category } = req.body;
    
    // কিছুই না দিলে early return
    if (!title && !category && !req.file)
      return res.status(400).json({ message: 'Nothing to update' })

    if (title) notice.title = title.trim();
    
    if(category) {
      const categories = Array.isArray(category)
        ? category
        : [category].filter(Boolean);
      if (categories.length > 0) notice.category = categories;
    }

    if (req.file) {
      await cloudinary.uploader.destroy(notice.pdfPublicId, {
        resource_type: "raw",
      });
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "ruet-cse/notices",
        resource_type: "raw",
        public_id: `notice_${Date.now()}`,
        format: "pdf",
      });
      notice.pdfURL = result.secure_url;
      notice.pdfPublicId = result.public_id;
    }

    await notice.save();
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DELETE — admin ───────────────────────────────────────────────
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    await cloudinary.uploader.destroy(notice.pdfPublicId, {
      resource_type: "raw",
    });
    await notice.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
