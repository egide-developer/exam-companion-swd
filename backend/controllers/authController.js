import User from '../models/User.js'
import { generateToken } from '../utils/helpers.js'

export async function signup(req, res) {
  try {
    const { name, email, password, securityQuestion, securityAnswer } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    const user = await User.create({ name, email, password, securityQuestion, securityAnswer })
    const token = generateToken(user)

    res.status(201).json({ user: user.toPublicJSON(), token })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(400).json({ message: 'Invalid email or password' })

    const token = generateToken(user)
    res.json({ user: user.toPublicJSON(), token })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function getMe(req, res) {
  try {
    res.json({ user: req.user.toPublicJSON() })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'No account with that email' })

    res.json({ question: user.securityQuestion })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function verifySecurityAnswer(req, res) {
  try {
    const { email, answer } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'No account with that email' })

    const match = await user.compareSecurityAnswer(answer)
    if (!match) return res.status(400).json({ message: 'Incorrect answer' })

    const resetToken = generateToken(user)
    res.json({ resetToken, message: 'Answer correct. You may reset your password.' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'No account with that email' })

    user.password = newPassword
    await user.save()

    const token = generateToken(user)
    res.json({ user: user.toPublicJSON(), token })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}
