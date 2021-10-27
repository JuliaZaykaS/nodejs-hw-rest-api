const { registration } = require('../../model/users')

const registrationController = async(req, res, next) => {
  const newUser = await registration(req.body)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter'
    }
  })
}

module.exports = registrationController
