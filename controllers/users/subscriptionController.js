const { subscription } = require('../../model/users')

const subscriptionController = async (req, res, next) => {
  if (!req.body.subscription) {
    return res.status(400).json({ message: 'missing field subscription' })
  }

  const updatedUser = await subscription(req.user, req.body)

  if (!updatedUser) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({
    subscription: updatedUser.subscription,
    message: 'success'

  })
}

module.exports = subscriptionController
