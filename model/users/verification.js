const { User } = require('../../db')
const { VerificationError } = require('../../helpers')

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken })
  if (!user) {
    throw new VerificationError('User not found')
  }
  user.verificationToken = null
  user.verify = true
  await user.save()
//   return user
}
module.exports = verification
