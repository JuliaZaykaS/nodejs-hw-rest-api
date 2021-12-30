
const { login } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const loginController = async (req, res, next) => {
  const user = await login(req.body)

  return res.status(HTTPCodes.OK).json({
    token: user.token,
    user: {
      name: user.upUser.name,
      email: user.upUser.email,
      subscription: 'starter'
    }

  })
}

module.exports = loginController
