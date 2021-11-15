const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('../helpers')
const { User } = require('../db')

const tokenValidation = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
      next(new AuthorizationError('Not authorized'))
    }

    const userFromToken = jwt.decode(token, process.env.JWT_SECRET)

    const user = await User.findById(userFromToken._id)

    if (!user || user.token !== token) {
      throw new AuthorizationError('Not authorized')
    }

    req.user = user
    req.token = token

    next()
  } catch (error) {
    next(new AuthorizationError('Not authorized'))
  }
}

module.exports = tokenValidation
