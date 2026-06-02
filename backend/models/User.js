import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.securityAnswer = await bcrypt.hash(this.securityAnswer, 12)
  next()
})

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

userSchema.methods.compareSecurityAnswer = async function (answer) {
  return bcrypt.compare(answer, this.securityAnswer)
}

userSchema.methods.toPublicJSON = function () {
  return { id: this._id, name: this.name, email: this.email }
}

export default mongoose.model('User', userSchema)
