const { subscription } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const subscriptionController = async (req, res, next) => {
  if (!req.body.subscription) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'missing field subscription' })
  }

  const updatedUser = await subscription(req.user, req.body)

  if (!updatedUser) {
    return res.status(HTTPCodes.NotFound).json({ message: 'Not found', code: 404 })
  }

  return res.status(HTTPCodes.OK).json({
    subscription: updatedUser.subscription,
    message: 'success'

  })
}

module.exports = subscriptionController
