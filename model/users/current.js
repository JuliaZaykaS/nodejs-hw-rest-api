const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers/errors')

const current = async (user) => {
  if (!user) {
    throw new AuthorizationError('Not authorized')
  }

  const foundUser = await User.findById(user._id)

  if (!foundUser) {
    throw new AuthorizationError('Not authorized')
  }
  return foundUser
}

module.exports = current
