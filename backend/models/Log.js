import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: Number },
  ip: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  duration: { type: Number },
  error: { type: String, default: null },
}, { timestamps: true })

logSchema.index({ createdAt: -1 })
logSchema.index({ userId: 1 })

export default mongoose.model('Log', logSchema)
