/*
  authMiddleware.js — অথরাইজেশন মিডলওয়্যার
  `protect` মিডলওয়্যার: রিকোয়েস্টের Authorization হেডার থেকে Bearer টোকেন যাচাই করে।
  টোকেন ভ্যালিড না হলে 401 রেসপন্স দেয়; ভ্যালিড হলে `req.admin` সেট করে পরবর্তী হ্যান্ডলারে পাঠায়।
*/
import jwt from 'jsonwebtoken'

/* protect: Bearer টোকেন যাচাই করে অ্যাডমিন এক্সেস অনুমোদন করে */
export const protect = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorized' })

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}