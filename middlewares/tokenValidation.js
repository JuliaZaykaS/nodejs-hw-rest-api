const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('../helpers')
const { User } = require('../db')

const tokenValidation = async (req, res, next) => {
  // console.log(req.headers)
  // const { authorization } = req.headers
  // if (!authorization) {
  //   throw new AuthorizationError('Please, provide a token in request authorization header')
  // }
  // if (!Object.keys(req.headers).includes('authorization')) {
  //   throw new AuthorizationError('Please, provide a token in request authorization header')
  // }
  // const a = req.headers.authorization
  // console.log(a)
  // if (req.headers.authorization === undefined) {
  //   throw new AuthorizationError('Not authorized')
  //   // throw new AuthorizationError('Please, provide a token in request authorization header')
  // }
  try {
    const [, token] = req.headers.authorization.split(' ')
    // const [, token] = req.rawHeaders[1].split(' ')
    // console.log(req);
    if (!token) {
      // if (!req.headers.authorization) {
      throw new AuthorizationError('Not authorized')
    }

    const userFromToken = jwt.decode(token, process.env.JWT_SECRET)

    const user = await User.findById(userFromToken._id)

    // if (!user || user.token !== token) {
    //   throw new AuthorizationError('Not authorized')
    // }

    req.user = user
    req.token = token

    next()
  } catch (error) {
    next(new AuthorizationError('Not authorized'))
  }
}

module.exports = tokenValidation
