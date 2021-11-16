const { verify } = require('../../model/users')
const { verificationMessage, HTTPCodes } = require('../../helpers')

const verifyController = async (req, res, next) => {
//   console.log(req.body)
  const { email } = req.body
//   console.log(email)
  if (!email) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'missing required field email' })
  }

  const user = await verify(email)
  if (!user) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'Verification has already been passed' })
  }

  await verificationMessage(email, user.verificationToken)
  return res.status(HTTPCodes.OK).json({ message: 'Verification email sent' })
}

module.exports = verifyController
