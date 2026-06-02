import jwt from 'jsonwebtoken'

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '14d' },
  )
}

export function generateResetToken(user) {
  return jwt.sign(
    { id: user._id, type: 'reset' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  )
}
