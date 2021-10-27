
const { login } = require('../../model/users')

const loginController = async (req, res, next) => {
  const token = await login(req.body)

  return res.status(200).json({
    token,
    user: {
      email: req.body.email,
      subscription: 'starter'
    }

  })
}

module.exports = loginController
