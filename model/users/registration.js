const bcrypt = require('bcrypt')
require('dotenv').config()
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')
const { User } = require('../../db')
const { AuthenticationError, verificationMessage } = require('../../helpers')

const registration = async (body) => {
  const {
    name,
    email,
    password
  } = body

  const isUser = await User.findOne({ email })

  if (isUser) {
    throw new AuthenticationError('Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT))
  const avatarURL = gravatar.url(email, { protocol: 'https', d: 'mp' })

  const verificationToken = uuidv4()

  const user = new User({ name, email, password: hashedPassword, avatarURL, verificationToken })
  await user.save()

  await verificationMessage(email, verificationToken)

  return user
}

module.exports = registration
