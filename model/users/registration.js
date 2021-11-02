const bcrypt = require('bcrypt')
require('dotenv').config()
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

  const user = new User({ email, password: hashedPassword })
  await user.save()
  return user
}

module.exports = registration
