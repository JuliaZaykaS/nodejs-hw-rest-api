const { verify } = require('../../model/users')
const { verificationMessage } = require('../../helpers')

const verifyController = async (req, res, next) => {
//   console.log(req.body)
  const { email } = req.body
//   console.log(email)
  if (!email) {
    return res.status(400).json({ message: 'missing required field email' })
  }

  const user = await verify(email)
  if (!user) {
    return res.status(400).json({ message: 'Verification has already been passed' })
  }

  await verificationMessage(email, user.verificationToken)
  return res.status(200).json({ message: 'Verification email sent' })
}

module.exports = verifyController
