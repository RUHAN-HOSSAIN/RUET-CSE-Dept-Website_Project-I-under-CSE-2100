/*
  noticeController.js — নোটিশ সম্পর্কিত হ্যান্ডলার
  নোটিশ রিসোর্সের CRUD অপারেশনগুলো এখানে আছে। PDF-ফাইলগুলো Cloudinary (raw) হিসেবে সংরক্ষণ করা হয়।
*/
import Notice from "../models/Notice.js";
import { uploadToCloudinary, cloudinary } from "../config/cloudinary.js";

// ─── GET all — পাবলিক তালিকা ──────────────────────────────────────
// GET /api/notices?page=1&limit=15&search=exam&category=Undergraduate&from=...&to=...
/*
  getNotices: নোটিশগুলোর তালিকা প্রদান করে — পেজিং, সার্চ, ক্যাটাগরি (অ্যারে) এবং তারিখ ফিল্টার সমর্থিত।
*/
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
  /* getNoticeStats: ক্যাটাগরি অনুযায়ী নোটিশের গণনা করে পরিসংখ্যান ফেরত দেয় */
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


// ─── POST — অ্যাডমিন ─────────────────────────────────────────────────
export const createNotice = async (req, res) => {
  /* createNotice: নতুন নোটিশ তৈরি করে। PDF Cloudinary-তে আপলোড করে এবং ক্যাটাগরি অ্যারে হ্যান্ডেল করে। */
  try {
    const { title, category } = req.body;

    if (!title?.trim())
      return res.status(400).json({ message: "Title is required" });
    if (!req.file)
      return res.status(400).json({ message: "PDF file is required" });

    // ক্যাটাগরি স্ট্রিং বা অ্যারে উভয় ফরম্যাটই হ্যান্ডেল করে
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

// ─── PUT — অ্যাডমিন ──────────────────────────────────────────────────
export const updateNotice = async (req, res) => {
  /* updateNotice: নোটিশ আপডেট করে। ক্যাটাগরি স্ট্রিং/অ্যারে উভয়ই সমর্থিত; PDF বদলালে পুরনো ফাইল মুছে ফেলা হয়। */
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    const { title, category } = req.body;
    
    // কিছুই না দিলে আগেভাগে রিটার্ন করে
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

// ─── DELETE — অ্যাডমিন ───────────────────────────────────────────────
export const deleteNotice = async (req, res) => {
  /* deleteNotice: নোটিশ এবং তার Cloudinary raw ফাইল মুছে ফেলে */
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
