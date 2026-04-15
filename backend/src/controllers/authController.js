/*
  authController.js — অথেনটিকেশন হ্যান্ডলার
  এই ফাইলে অ্যাডমিন লগইনের সহজ হ্যান্ডলার আছে, যা পরিবেশভিত্তিক ক্রেডেনশিয়াল যাচাই করে JWT প্রদান করে।
*/
import jwt from 'jsonwebtoken'

/*
  adminLogin: অ্যাডমিনের ক্রেডেনশিয়াল যাচাই করে JWT টোকেন তৈরি করে ফেরত দেয়।
  ক্রেডেনশিয়ালগুলো পরিবেশ ভ্যারিয়েবল (`ADMIN_USER_ID`, `ADMIN_PASSWORD`) থেকে নেয়া হয়।
*/
export const adminLogin = (req, res) => {
  const { userId, password } = req.body

  if (
    userId !== process.env.ADMIN_USER_ID ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
}