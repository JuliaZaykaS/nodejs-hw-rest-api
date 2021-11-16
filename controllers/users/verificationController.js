const { verification } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params

  await verification(verificationToken)

  return res.status(HTTPCodes.OK).json({ message: 'Verification successful' })
}

module.exports = verificationController
