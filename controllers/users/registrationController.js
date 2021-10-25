const { registration } = require('../../model/users')

const registrationController = async(req, res, next) => {
//   const { email } = req.body
  //   try {
  const newUser = await registration(req.body)
  // if (!newUser) {
  //   return res.status(409).json({ message: 'Email in use' })
  // }
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter'
    }
  })
//   } catch (error) {
//     res.status(400).json({ message: 'fail' })
//   }
//   next()
}

module.exports = registrationController
