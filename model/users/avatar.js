const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers')

const avatar = async (user, body) => {
  if (!user) {
    throw new AuthorizationError('Not authorized')
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { subscription: body.subscription } }, { new: true, runValidators: true })
  return updatedUser
}

module.exports = avatar
