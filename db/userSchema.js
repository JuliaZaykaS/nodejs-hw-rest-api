const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'verification Token is required'],
  },

}, { versionKey: false, timestamps: true })

const User = mongoose.model('user', userSchema)

module.exports = { User }
