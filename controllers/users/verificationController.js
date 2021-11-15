const verification = require('../../model/users')

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params
  await verification(verificationToken)
  return res.status(200).json({ message: 'Verification successful' })
}

module.exports = verificationController
