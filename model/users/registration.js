const bcrypt = require('bcrypt')
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

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({ email, password: hashedPassword })
  await user.save()
  return user
}

module.exports = registration
