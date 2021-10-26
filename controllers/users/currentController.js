const { current } = require('../../model/users')

const currentController = async (req, res, next) => {
  const user = await current(req.user)

  return res.status(200).json({
    email: user.email,
    subscription: user.subscription

  })
}

module.exports = currentController
