import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { CronJob } from 'cron'
import axios from 'axios'
import connectDB from './config/db.js'
import requestLogger from './middleware/logger.js'
import authRoutes from './routes/authRoutes.js'
import logRoutes from './routes/logRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }))
app.use(express.json())
app.use(requestLogger)

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.use('/api/auth', authRoutes)
app.use('/api/logs', logRoutes)

app.use((_, res) => res.status(404).json({ message: 'Route not found' }))

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

    const selfUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`
    new CronJob(
      '*/10 * * * *',
      async () => {
        try {
          const res = await axios.get(`${selfUrl}/health`, { timeout: 10000 })
          console.log(`Health check: ${res.status}`)
        } catch {
          console.log('Health check failed')
        }
      },
      null,
      true,
      'UTC',
    )
    console.log('Health check cron started (every 10 min)')
  })
}

start()
