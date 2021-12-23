const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthorizationError, VerificationError } = require('../../helpers')
const { User } = require('../../db/')

const login = async (body) => {
  const { email, password } = body

  const user = await User.findOne({ email })

  if (!user) {
    throw new AuthorizationError('Email or password is wrong')
  }

  if (!user.verify) {
    throw new VerificationError('Your email is not verificated. Please, watch through your mail.')
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new AuthorizationError('Email or password is wrong')
  }

  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt,
  }, process.env.JWT_SECRET)

  const upUser = await User.findByIdAndUpdate(user._id, { $set: { token } })
  // console.log(upUser);
  return upUser
  // await User.findByIdAndUpdate(user._id, { $set: { token } })
  // return token
}

module.exports = login
