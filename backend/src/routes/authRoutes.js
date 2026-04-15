/*
  authRoutes.js — অথেনটিকেশন রুট
  সফল লগইনে JWT টোকেন ফেরত দেয় এমন অ্যাডমিন লগইন রুট এখানে সংজ্ঞায়িত করা হয়েছে।
*/
import express from 'express'
import { adminLogin } from '../controllers/authController.js'

const router = express.Router()
router.post('/login', adminLogin)

export default router