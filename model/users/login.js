const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('../../helpers')
const { User } = require('../../db/')

const login = async (body) => {
  const { email, password } = body

  const user = await User.findOne({ email })

  if (!user) {
    throw new AuthorizationError('Email or password is wrong')
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new AuthorizationError('Email or password is wrong')
  }

  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt,
  }, process.env.JWT_SECRET)

  await User.findByIdAndUpdate(user._id, { $set: { token } })
  return token
}

module.exports = login
