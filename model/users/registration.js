const bcrypt = require('bcrypt')
const { User } = require('../../db')

// const registration = async (req, res) => {
const registration = async (body) => {
  const {
    email,
    password
  } = body
//   const {
//     email,
//     password
//   } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
//   const password = bcrypt.hash(password, 10)

  const user = new User({ email, password: hashedPassword })
    await user.save()
    return user
}

module.exports = registration
