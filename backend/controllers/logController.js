import Log from '../models/Log.js'

export async function getLogs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 50
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.method) filter.method = req.query.method.toUpperCase()
    if (req.query.status) filter.status = parseInt(req.query.status)

    const [logs, total] = await Promise.all([
      Log.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId', 'name email'),
      Log.countDocuments(filter),
    ])

    res.json({ logs, total, page, pages: Math.ceil(total / limit) })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}
