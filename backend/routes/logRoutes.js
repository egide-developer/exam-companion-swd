import { Router } from 'express'
import { getLogs } from '../controllers/logController.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/', auth, getLogs)

export default router
