const { User } = require('../../db')

const verify = async (email) => {
  // const { email } = body
  // if (!email) {
  //     throw new ApiErrors('message": "missing required field email')
  // }
  const user = await User.findOne({ email, verify: false })
  return user
}

module.exports = verify
