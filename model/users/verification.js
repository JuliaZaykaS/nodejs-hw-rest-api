const { User } = require('../../db')
const { VerificationError } = require('../../helpers')

const verification = async (verificationToken) => {
  console.log('ctrl', verificationToken)
  const user = await User.findOne({ verificationToken, verify: false })
  //   console.log(user)
  if (!user) {
    throw new VerificationError('User not found')
  }
  //   user.verificationToken = null
  //   user.verificationToken = ''
  // user.verify = true
  // user.verificationToken = null
  // user.verificationToken = 'null'
  // user.verificationToken = ' '
  //   const upd = await User.findByIdAndUpdate(user._id, { $set: { verificationToken: null, verify: true } }, { new: true, runValidators: true })
  await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })
  // await user.save()
  // user.verificationToken = null
  // await user.save()

  //   console.log('after', upd)
//   return user
//   return upd
}
module.exports = verification
