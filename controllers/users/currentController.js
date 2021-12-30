const { current } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const currentController = async (req, res, next) => {
  const user = await current(req.user)

  return res.status(HTTPCodes.OK).json({
    name: user.name,
    email: user.email,
    subscription: user.subscription
  })
}

module.exports = currentController
