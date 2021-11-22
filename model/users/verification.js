const { User } = require('../../db')
const { VerificationError } = require('../../helpers')

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, verify: false })

  if (!user) {
    throw new VerificationError('User not found')
  }

  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
}
module.exports = verification
