const { tokenValidation } = require('../middlewares')
const { AuthorizationError } = require('../helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require('../db')

describe('Auth middleware test', () => {
  it('user send valid token', () => {
    const user = {
      _id: '1',
      createdAt: new Date().getTime()
    }
    const token = jwt.sign({
      _id: user._id,
      createdAt: user.createdAt,
    }, process.env.JWT_SECRET)

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const mRes = {}
    const mockNext = jest.fn()

    tokenValidation(mReq, mRes, mockNext)

    expect(mReq.token).toEqual(token)
    expect(mReq.user).toEqual(user)
    // expect(mReq.user._id).toEqual(user._id)
    // expect(mReq.user.createdAt).toEqual(user.createdAt)
    expect(mockNext).toHaveBeenCalled()
  })
  // it('user send invalid token', async () => {
  //   const mReq = {
  //     headers: {
  //       authorization: 'Bearer 112247djdhgs'
  //     }
  //   }
  //   const mToken = '112247djdhgs'
  //   const userFromToken = jwt.decode(mToken, process.env.JWT_SECRET)

  //   // const user = await User.findById(userFromToken._id)
  //   // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))
  //   const result = await jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))
  //   // const user = await User.findById(userFromToken._id)

  //   if (!user || user.token !== token) {
  //     throw new AuthorizationError('Not authorized')
  //   }

  // });
  it('user send no token', async() => {
    const mReq = {
      headers: {}
    }
    // const mReq = {}
    const mRes = {}
    const mockNext = jest.fn()
    // try {
    await tokenValidation(mReq, mRes, mockNext)
    // } catch (error) {
    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
    // }
  })
})
