import Log from '../models/Log.js'

export default function requestLogger(req, res, next) {
  const start = Date.now()
  const originalEnd = res.end.bind(res)

  res.end = function (...args) {
    const duration = Date.now() - start
    Log.create({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      ip: req.ip || req.connection?.remoteAddress,
      userId: req.user?._id || null,
      duration,
      error: res.statusCode >= 400 ? res.statusMessage || 'Error' : null,
    }).catch(() => {})
    originalEnd(...args)
  }

  next()
}
