const { verification } = require('../../model/users')
const { VerificationError } = require('../../helpers')

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params
//   const { verificationToken } = req.body
  console.log(verificationToken)
  //   if (!await verification(verificationToken)) {
  //     throw new VerificationError('Not found')
  //   }
  await verification(verificationToken)
  return res.status(200).json({ message: 'Verification successful' })
}

module.exports = verificationController
