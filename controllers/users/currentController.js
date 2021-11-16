const { current } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const currentController = async (req, res, next) => {
  const user = await current(req.user)

  return res.status(HTTPCodes.OK).json({
    email: user.email,
    subscription: user.subscription

  })
}

module.exports = currentController
