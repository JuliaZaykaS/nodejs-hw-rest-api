const { tokenValidation } = require('../middlewares')
const { AuthorizationError } = require('../helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require('../db')

describe('Auth middleware test', () => {
  it('user send valid token', async() => {
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

    const mUserFromBase = {
      _id: '1',
      token: token,
      createdAt: user.createdAt,
    }

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))

    await tokenValidation(mReq, mRes, mockNext)

    expect(token).toEqual(mUserFromBase.token)
    expect(user._id).toEqual(mUserFromBase._id)
    expect(user.createdAt).toEqual(mUserFromBase.createdAt)
    expect(mockNext).toHaveBeenCalled()
  })

  it('user send invalid token', async () => {
    const user = {
      _id: '1',
      createdAt: new Date().getTime()
    }
    const token = jwt.sign({
      _id: user._id,
      createdAt: user.createdAt,
    }, 'dfdfdfdf')

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const mRes = {}
    const mockNext = jest.fn()

    const mUserFromBase = {
      _id: '1',
      tokenFromBase: jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
      }, process.env.JWT_SECRET),
      createdAt: user.createdAt,
    }

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase.tokenFromBase))
    await tokenValidation(mReq, mRes, mockNext)

    expect(mUserFromBase.tokenFromBase).not.toBe(token)
    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
  })
  it('user send invalid token,becouse this user not found', async () => {
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

    const mUserFromBase = {
      _id: '2',
      tokenFromBase: jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
      }, process.env.JWT_SECRET),
      createdAt: user.createdAt,
    }

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))

    await tokenValidation(mReq, mRes, mockNext)

    expect(user._id).not.toBe(mUserFromBase._id)
    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
  })
  it('user send no token', async() => {
    const mReq = {
      headers: {}
    }

    const mRes = {}
    const mockNext = jest.fn()

    await tokenValidation(mReq, mRes, mockNext)

    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
  })
})
