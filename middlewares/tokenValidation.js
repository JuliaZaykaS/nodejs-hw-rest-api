const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('../helpers/errors')
const { User } = require('../db')

const tokenValidation = async (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(' ')
  if (!token) {
    throw new AuthorizationError('Not authorized')
  }
  try {
    const userFromToken = jwt.decode(token, process.env.JWT_SECRET)
    //   const user = await User.findOne({userFromToken._id})
    const user = await User.findById(userFromToken._id)
    // console.log(user)
    if (!user) {
      throw new AuthorizationError('Not authorized')
    }
    if (user.token === token) {
      req.user = user
      req.token = token
    }
    console.log(req.user)
    next()
  } catch (error) {
    next(new AuthorizationError('Not authorized'))
  }
}

module.exports = tokenValidation
