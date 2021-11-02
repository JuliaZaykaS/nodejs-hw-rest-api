const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers')

const logout = async (user) => {
  if (!user) {
    throw new AuthorizationError('Not authorized')
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { token: null } })
  if (!updatedUser) {
    throw new AuthorizationError('Not authorized')
  }
}

module.exports = logout
