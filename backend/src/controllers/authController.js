import jwt from 'jsonwebtoken'

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