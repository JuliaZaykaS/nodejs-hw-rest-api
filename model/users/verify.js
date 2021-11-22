const { User } = require('../../db')

const verify = async (email) => {
  const user = await User.findOne({ email, verify: false })
  return user
}

module.exports = verify
