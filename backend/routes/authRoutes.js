import { Router } from 'express'
import { signup, login, getMe, forgotPassword, verifySecurityAnswer, resetPassword } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/me', auth, getMe)
router.post('/forgot-password', forgotPassword)
router.post('/verify-answer', verifySecurityAnswer)
router.post('/reset-password', resetPassword)

export default router
