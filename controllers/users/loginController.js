
const { login } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const loginController = async (req, res, next) => {
  const token = await login(req.body)

  return res.status(HTTPCodes.OK).json({
    token,
    user: {
      email: req.body.email,
      subscription: 'starter'
    }

  })
}

module.exports = loginController
