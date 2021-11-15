const request = require('supertest')
const app = require('../app')
const fs = require('fs/promises')

const { User } = require('../db')

const avatarURL = '/avatars/1/1-not-found.jpg'
const updatedUser = {
  _id: '1',
  avatarURL: '/avatars/1/1-not-found.jpg',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNjM2NzEwOTAyfQ.hw-fLwnb8dCzSPaCDfCdu4amTVCHOre12y8I46wSgbg'
}

jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(async () => (updatedUser))

jest.mock('../middlewares/tokenValidation.js', () => {
  return (req, res, next) => {
    req.user = { _id: '1' }
    next()
  }
})

describe('should handle patch request users/avatars', () => {
  it('should return status 200 for change avatar', async () => {
    const buffer = await fs.readFile('./test/data/not-found-image-15383864787lu.jpg')
    const res = await request(app)
      .patch('/users/avatars')
      .set('Authorization', `Bearer ${updatedUser.token}`)
      .attach('avatar', buffer, 'not-found.jpg')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.avatarURL).toEqual(avatarURL)
  })
})
