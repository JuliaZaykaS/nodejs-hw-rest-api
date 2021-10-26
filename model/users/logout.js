const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../db')
const { AuthorizationError } = require('../../helpers/errors')

const logout = async (user) => {
//   const { user, token } = req
  if (!user) {
    throw new AuthorizationError('Not authorized')
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { token: null } })
  if (!updatedUser) {
    throw new AuthorizationError('Not authorized')
  }
}

module.exports = logout
