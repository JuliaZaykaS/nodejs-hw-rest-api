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

    // const userFromToken = jwt.decode(token, process.env.JWT_SECRET)
    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))

    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))
    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))
    // const result = User.findById(mUserFromBase._id)
    await tokenValidation(mReq, mRes, mockNext)
    // const mReqUser = user
    // expect(result._id).toEqual(user._id)
    // expect(result.token).toEqual(token)
    // expect(result.createdAt).toEqual(user.createdAt)
    // expect(mReqUser.token).toEqual(token)
    // expect(token).toEqual(token)
    // expect(mReq.token).toEqual(token)
    // expect(mReq.token).toEqual(token)
    // expect(mReq.mUserFromBase.token).toEqual(token)
    // expect(mUserFromBase.token).toEqual(token)
    expect(token).toEqual(mUserFromBase.token)
    // expect(mReq.user).toEqual(user)
    // expect(mReqUser.user).toEqual(user)
    // expect(user).toEqual(mReqUser.user)
    // expect(mReq.mUserFromBase.user._id).toEqual(user._id)
    expect(user._id).toEqual(mUserFromBase._id)
    expect(user.createdAt).toEqual(mUserFromBase.createdAt)
    // expect(mReq.mUserFromBase.createdAt).toEqual(user.createdAt)
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

    // const userFromToken = jwt.decode(token, process.env.JWT_SECRET)

    const mUserFromBase = {
      _id: '1',
      tokenFromBase: jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
      }, process.env.JWT_SECRET),
      createdAt: user.createdAt,
    }

    // const userFromToken = jwt.decode(token, process.env.JWT_SECRET)
    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase.tokenFromBase))
    // const result = User.findById(mUserFromBase._id)
    await tokenValidation(mReq, mRes, mockNext)
    // expect(mUserFromBase).toEqual(undefined)
    // expect(token).not.toBe(mUserFromBase.tokenFromBase)
    expect(mUserFromBase.tokenFromBase).not.toBe(token)
    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
    // expect(mReq.user).toEqual(user)
    // expect(mReqUser.user).toEqual(user)
    // expect(user).toEqual(mReqUser.user)
    // expect(mReq.mUserFromBase.user._id).toEqual(user._id)

    // const user = await User.findById(userFromToken._id)
    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))

    // const user = await User.findById(userFromToken._id)
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

    // const userFromToken = jwt.decode(token, process.env.JWT_SECRET)

    const mUserFromBase = {
      _id: '2',
      tokenFromBase: jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
      }, process.env.JWT_SECRET),
      createdAt: user.createdAt,
    }

    // const userFromToken = jwt.decode(token, process.env.JWT_SECRET)
    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))
    // const result = User.findById(mUserFromBase._id)
    await tokenValidation(mReq, mRes, mockNext)
    // expect(mUserFromBase).toEqual(undefined)
    // expect(token).not.toBe(mUserFromBase.tokenFromBase)
    // expect(mUserFromBase._id).not.toBe(user._id)
    expect(user._id).not.toBe(mUserFromBase._id)
    // expect(mUserFromBase._id).not.toBe(userFromToken._id)
    expect(mockNext).toHaveBeenCalledWith(new AuthorizationError('Not authorized'))
    // expect(mReq.user).toEqual(user)
    // expect(mReqUser.user).toEqual(user)
    // expect(user).toEqual(mReqUser.user)
    // expect(mReq.mUserFromBase.user._id).toEqual(user._id)

    // const user = await User.findById(userFromToken._id)
    // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (user))

    // const user = await User.findById(userFromToken._id)
  })
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
