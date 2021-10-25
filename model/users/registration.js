const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers/errors')

// const registration = async (req, res) => {
const registration = async (body) => {
  const {
    email,
    password
  } = body

  // const isUser = await User.find({ email })
  const isUser = await User.findOne({ email })
  // console.log(isUser)
  if (isUser) {
    throw new AuthorizationError('Email in use')
  }
  //   const {
  //     email,
  //     password
  //   } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  //   const password = bcrypt.hash(password, 10)

  // const token = jwt.sign({
  //   _id:
  // })
  const user = new User({ email, password: hashedPassword })
  await user.save()
  return user
}

module.exports = registration
