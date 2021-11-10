const request = require('supertest')
const app = require('../app')
const { users, updateAvatar } = require('../model/users/__mocks__/users')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const { tokenValidation } = require('../middlewares')
// const avatarController}
// jest.setTimeout(200000)
jest.fn().mockImplementation('../model/users/avatar.js', jest.fn())
// jest.mock('../model/users/avatar.js')
jest.mock('../middlewares/tokenValidation.js', () => {
  return (req, res, next) => {
    req.user = { _id: '1' }
    next()
  }
})
jest.mock('../controllers/users/avatarController.js', () => {
  return (req, res, next) => {
    next()
  }
  // updatedUser.avatarURL: updateAvatar.avatar
})

describe('should handle patch request users/avatars', () => {
  // const token = 'fffffff'
  // const mReq = {
  //   headers: {
  //     authorization: `Bearer ${token}`
  //   }

  // }
  // const user = {
  //   token: token,
  // }
  // jest.spyOn(mReq, tokenValidation).mockImplementationOnce(async () => (user.token))
  //   it('should return status 401, if user has invalid token ', async (done) => {
  //   it('should return status 401, if user has invalid token ', async () => {
  //     // const user = undefined
  //     const res = await request(app)
  //       .patch('/users/avatars')
  //     //   .set('Accept', '*/*')
  //       .auth('my_token', { type: 'bearer' })
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
  it('should return status 200 for change avatar', async () => {
    // const user = {
    //   _id: '1',
    //   createdAt: new Date().getTime()
    // }
    // const token = jwt.sign({
    //   _id: user._id,
    //   createdAt: user.createdAt,
    // }, process.env.JWT_SECRET)

    // const mReq = {
    //   headers: {
    //     authorization: `Bearer ${token}`
    //   }
    // }

    const res = await request(app)
      .patch('/users/avatars')
    //   .set('Accept', '*/*')
      // .auth(user.token, { type: 'bearer' })
      // .send({ avatar: '../public/loshad-voronoy-griva-krasavec.jpg' })
      // .set('Content-Type', 'image/jpg')
      // .send({ avatar: 'loshad-voronoy-griva-krasavec.jpg' })
      .send(updateAvatar)
      .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data.avatarURL).toBeInstanceOf(String)
  })
})
