const request = require('supertest')
const app = require('../app')
const fs = require('fs/promises')
const jwt = require('jsonwebtoken')

const { AuthorizationError } = require('../helpers')
// const { avatar } = require('../model/users')
// const { users, updateAvatar } = require('../model/users/__mocks__/users')
const { tokenValidation } = require('../middlewares')
const { avatarController } = require('../controllers/users')
// const { users } = require('./data/users')
const users = require('./data/testDB.json')
const { User } = require('../db')
// const { User } = require('../db')
// console.log(users)
const avatarURL = '/avatars/1/1-not-found.jpg'
// return avatarURL
const updatedUser = {

  _id: '1',
  avatarURL: '/avatars/1/1-not-found.jpg',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNjM2NzEwOTAyfQ.hw-fLwnb8dCzSPaCDfCdu4amTVCHOre12y8I46wSgbg'
}

jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(async () => (updatedUser))
// jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(async () => {
//   // avatarURL = '/avatars/1/1-not-found.jpg'
//   // users[0] = {
//   //   ...users[0],
//   //   // avatarURL: updatedUser.avatarURL,
//   const avatarURL = '/avatars/1/1-not-found.jpg'
//   return avatarURL

//   // }
// })
// jest.mock('../model/users/avatar.js', () => {
//   // const updatedUser = await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatarURL } }, { new: true, runValidators: true })
//   return updatedUser
// })
jest.mock('../middlewares/tokenValidation.js', () => {
  return (req, res, next) => {
    req.user = { _id: '1' }
    // req.token = users.token
    next()
  }
})

describe('should handle patch request users/avatars', () => {

  // const user = {
  //   _id: '1',
  // }
  // const token = jwt.sign({
  //   _id: user._id,
  // }, process.env.JWT_SECRET)
  // console.log(token)

  // it('should return status 401 ', async () => {
  //   const token = '111'
  //   const res = await request(app)
  //     .patch('/users/avatars')
  //     .set('Authorization', `Bearer ${token}`)

  //   expect(res.status).toEqual(401)
  // })

  it('should return status 200 for change avatar', async () => {
    const buffer = await fs.readFile('./test/data/not-found-image-15383864787lu.jpg')
    const res = await request(app)
      .patch('/users/avatars')
      .set('Authorization', `Bearer ${users.token}`)
      // .attach('avatar', './data/not-found-image-15383864787lu.jpg')
      .attach('avatar', buffer, 'not-found.jpg')
    //     // .auth('token', { type: 'bearer' })
    //       .set('Authorization', `Bearer ${userToken}`)
    //     // .auth(token, { type: 'bearer' })
      // .send({ avatar: './data/loshad-voronoy-griva-krasavec.jpg' })
    //       .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    // expect(users[0].avatarURL).toEqual(updatedUser.avatarURL)
    expect(res.body.avatarURL).toEqual(avatarURL)
    // expect(res.body)
    //     // expect(res.body.message).to.be.equal('Not authorized')
    //     // expect(res.message).to.be.equal('Not authorized')
    //     // expect(res.json.message).to.be.equal('Not authorized')
    //     // expect(res.body.message).toBe('Not authorized')
    //     // expect(res.body.data.avatarURL).toBeInstanceOf(String)
  })
})

// const updateAvatar = {
//   avatarURL: '/avatars/1/cat'
// }
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const avatarController}
// jest.setTimeout(200000)
// jest.fn().mockImplementation('../model/users/avatar.js', jest.fn())
// jest.mock('../model/users/avatar.js', () => jest.fn())
// jest.mock('../model/users/avatar.js')
// jest.mock('../middlewares/tokenValidation.js', () => {
//   return (req, res, next) => {
//     req.user = { _id: '1' }
//     next()
//   }
// })
// jest.mock('../controllers/users/avatarController.js', () => {
//   return (req, res, next) => {
//     // jest.spyOn(User, 'findById').mockImplementationOnce(async () => (mUserFromBase))
//     // jest.spyOn('../model/users/avatar.js') .mockImplementationOnce( async() => (updateAvatar))
//     jest.fn().mockImplementationOnce('../model/users/avatar.js', async() => (updateAvatar))
//     // jest.mock('../model/users/avatar.js', async() => updateAvatar)

//     return res.status(200)
//       .json({
//         avatarURL: updateAvatar.avatarURL

//       })
//   }
//   // updatedUser.avatarURL: updateAvatar.avatar
// })
// const updateAvatar = {
//   avatarURL: '/avatars/1/cat'
// }
// jest.mock('../middlewares/tokenValidation.js', () => {
//   return (req, res, next) => {
//     req.user = { _id: '1' }
//     next()
//   }
// })
// jest.mock('../controllers/users/avatarController.js', () => {
//   return (req, res, next) => {
//     jest.fn().mockImplementationOnce('../model/users/avatar.js', async() => (updateAvatar))
//     return res.status(200)
//       .json({
//         avatarURL: updateAvatar.avatarURL

//       })
//   }
// })

// describe('should handle patch request users/avatars', () => {
//   beforeAll(async () => {
//     const user = {
//       _id: '1',
//       createdAt: new Date().getTime()
//     }
//     const token = jwt.sign({
//       _id: user._id,
//       createdAt: user.createdAt,
//     }, process.env.JWT_SECRET)
//   })
// describe('should handle patch request users/avatars', () => {
//   let token
//   beforeAll(async () => {
//     const user = {
//       _id: '1',
//       createdAt: new Date().getTime()
//     }
//     const tokenCreated = jwt.sign({
//       _id: user._id,
//       createdAt: user.createdAt,
//     }, process.env.JWT_SECRET)
//     token = tokenCreated
//   })
//   // let user, token
//   // await db
//   // await User.deleteOne({ email: newUserForRouteCat.email })
//   // user = await User.create(newUserForRouteCat)
//   // const SECRET_KEY = process.env.JWT_SECRET_KEY
//   // const issueToken = (payload, secret) => jwt.sign(payload, secret)
//   // token = issueToken({ id: user._id }, SECRET_KEY)
//   // await User.updateOne({ _id: user._id }, { token })
//   // })

//   // let token
//   // const token = 'fffffff'
//   // const mReq = {
//   //   headers: {
//   //     authorization: `Bearer ${token}`
//   //   }

//   // }
//   // const user = {
//   //   token: token,
//   // }
//   // jest.spyOn(mReq, tokenValidation).mockImplementationOnce(async () => (user.token))
//   // jest.fn().mockImplementationOnce(async () => (user.token))
//   // it('should return status 401, if user has invalid token ', async (done) => {
//   it('should return status 401, if user has invalid token ', async () => {
//     const userToken = token
//     jest.mock('../middlewares/tokenValidation.js', () => {
//       return (req, res, next) => {
//         // req.token = null
//         return res.status(401)
//         // req.token = undefined
//         // if (req.headers.authorization === undefined) { return res.status(401) }
//         // next()
//         // next(new AuthorizationError('Not authorized'))
//       }
//     })
//     // const userFromBase = {
//     //   _id:'2'
//     // }
//     // if(userFromBase._id !== user._id)
//     const res = await request(app)
//       .patch('/users/avatars')
//     //   .set('Accept', '*/*')
//     // .auth('token', { type: 'bearer' })
//       .set('Authorization', `Bearer ${userToken}`)
//       // .set('Authorization', `Bearer ${token}`)
//     // .auth(token, { type: 'bearer' })
//       .send({ avatar: '../public/loshad-voronoy-griva-krasavec.jpg' })
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//     expect(res.status).toEqual(401)
//     // expect(res.body.message).to.be.equal('Not authorized')
//     // expect(res.message).to.be.equal('Not authorized')
//     // expect(res.json.message).to.be.equal('Not authorized')
//     // expect(res.body.message).toBe('Not authorized')
//     // expect(res.body.data.avatarURL).toBeInstanceOf(String)
//     // done()
//   })
//   it('should return status 200 for change avatar', async () => {
//     const updateAvatar = {
//       _id: '1',
//       avatarURL: '/avatars/1/cat'
//     }

//     const findUser = {
//       _id: '1',
//     //   createdAt: new Date().getTime()
//     }

//     const file = {
//       path: './data/loshad-voronoy-griva-krasavec.jpg',
//       originalname: 'loshad-voronoy-griva-krasavec.jpg'
//     }
//     // const userToken = token
//     // const user = {
//     //   _id: '1',
//     //   createdAt: new Date().getTime()
//     // }
//     // const token = jwt.sign({
//     //   _id: user._id,
//     //   createdAt: user.createdAt,
//     // }, process.env.JWT_SECRET)

//     // const mReq = {
//     //   headers: {
//     //     authorization: `Bearer ${token}`
//     //   }
//     // }
//     // const mockNext = jest.fn()
//     // // const mReq = {}
//     // const mRes = {}
//     // await tokenValidation(mReq, mRes, mockNext)

//     // jest.fn().mockImplementation('../model/users/avatar.js', jest.fn())
//     // jest.fn().mockImplementation('../middlewares/tokenValidation.js', async() => jest.fn())
//     // jest.fn().mockImplementation('../middlewares/tokenValidation.js', async () => ({
//     //   _id: '1'
//     // }))
//     // jest.mock('../middlewares/tokenValidation.js', () => {
//     //   // let token='1111'
//     //   // const token = '1111'
//     //   // jest.fn()
//     //   // const user = {
//     //   //   _id: '1',
//     //   //   createdAt: new Date().getTime()
//     //   // }
//     //   // const token = jwt.sign({
//     //   //   _id: user._id,
//     //   //   createdAt: user.createdAt,
//     //   // }, process.env.JWT_SECRET)
//     //   // const mockNext = jest.fn()
//     //   // const mReq = {}
//     //   // const mRes = {}
//     //   // return (mReq, mRes, mockNext) => {
//     //   //   mockNext()
//     //   return (req, res, next) => {
//     //     // return res.status(200)
//     //     // req.user = { _id: '1' }
//     //     // return req.user
//     //     // next(req.user)
//     //     req.token = userToken
//     //     // req.user = user
//     //     next()
//     //   }
//     // }
//     // )

//     // jest.fn().mockImplementationOnce('../middlewares/tokenValidation.js', async() => (findUser))
//     jest.fn().mockImplementationOnce('../middlewares/tokenValidation.js', async () => (findUser))
//     // const buffer = await fs.readFile('./test/data/loshad-voronoy-griva-krasavec.jpg')
//     jest.fn().mockImplementationOnce('../model/users/avatar.js', async () => (updateAvatar))
//     jest.fn().mockImplementationOnce('../controllers/users/avatarController.js', async () => {
//       return res.status(200).json({
//         avatarURL: updateAvatar.avatarURL

//       })
//     })
//     // console.log(file)
//     // const { path: tempPath, originalname } = file
//     // await avatarController(updateAvatar, { path: tempPath, originalname })
//     // jest.mock('../controllers/users/avatarController.js', () => {
//     //   return (req, res, next) => {
//     //     jest.fn().mockImplementationOnce('../model/users/avatar.js', async () => (updateAvatar))
//     //     return res.status(200)
//     //       .json({
//     //         avatarURL: updateAvatar.avatarURL

//     //       })
//     //   }
//     // })
//     // jest.mock('../controllers/users/avatarController.js', () => {
//     //   return (req, res, next) => {
//     //     jest.fn().mockImplementationOnce('../model/users/avatar.js', async () => (updateAvatar))
//     //     return res.status(200)
//     //       .json({
//     //         avatarURL: updateAvatar.avatarURL

//     //       })
//     //   }
//     // })
//     // const user = {
//     //   _id: '1',
//     //   createdAt: new Date().getTime()
//     // }
//     // const token = jwt.sign({
//     //   _id: user._id,
//     //   createdAt: user.createdAt,
//     // }, process.env.JWT_SECRET)

//     // const mReq = {
//     //   headers: {
//     //     authorization: `Bearer ${token}`
//     //   }
//     // }
//     // token = '11111'

//     const res = await request(app)
//       .patch('/users/avatars')
//       // .set('Authorization', `Bearer ${userToken}`)
//       // .set('Authorization', `Bearer ${token}`)
//     //   .set('Accept', '*/*')
//     // .auth(user.token, { type: 'bearer' })
//     // .send({ avatar: '../public/loshad-voronoy-griva-krasavec.jpg' })
//     // .set('Content-Type', 'image/jpg')
//     // .send({ avatar: 'loshad-voronoy-griva-krasavec.jpg' })
//       .send(updateAvatar)
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//     expect(res.status).toEqual(200)
//     expect(res.body).toBeDefined()
//     expect.stringContaining(res.body.avatarURL)
//     // expect(res.body.avatarURL).toBe(String)
//   })
//   // it('Upload avatar for user', async () => {
//   //   const buffer = await fs.readFile('./test/data/loshad-voronoy-griva-krasavec.jpg')
//   //   const response = await request(app)
//   //     .patch('/users/avatar')
//   //     .set('Authorization', `Bearer ${token}`)
//   //     .attach('avatar', buffer, 'loshad-voronoy-griva-krasavec.jpg')

//   //   expect(response.status).toEqual(200)
//   //   expect(response.body).toBeDefined()
//   // })
// })
// // }
