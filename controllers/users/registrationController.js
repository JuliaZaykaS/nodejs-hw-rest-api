const { registration } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const registrationController = async(req, res, next) => {
  const newUser = await registration(req.body)

  res.status(HTTPCodes.Created).json({
  // res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter',
    }
  })
}

module.exports = registrationController
