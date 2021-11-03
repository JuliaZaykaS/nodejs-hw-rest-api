const bcrypt = require('bcrypt')
require('dotenv').config()
const gravatar = require('gravatar')
const { User } = require('../../db')
const { AuthenticationError } = require('../../helpers')

const registration = async (body) => {
  const {
    email,
    password
  } = body

  const isUser = await User.findOne({ email })

  if (isUser) {
    throw new AuthenticationError('Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT))
  const avatarURL = gravatar.url(email, { protocol: 'https', d: 'mp' })

  const user = new User({ email, password: hashedPassword, avatarURL })
  await user.save()
  return user
}

module.exports = registration
