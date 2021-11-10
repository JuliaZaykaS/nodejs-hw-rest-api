const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// jest.setTimeout(200000)

describe('should handle patch request users/avatars', () => {
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




    const res = await request(app)
      .patch('/users/avatars')
    //   .set('Accept', '*/*')
      .auth(token, { type: 'bearer' })
      .send({ avatar: '../public/loshad-voronoy-griva-krasavec.jpg' })
      .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data.avatarURL).toBeInstanceOf(String)
  })
})
