const { avatar } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const avatarController = async (req, res, next) => {
  const updatedUser = await avatar(req.user, req.file)
  console.log(req.file)

  return res.status(HTTPCodes.OK).json({
    avatarURL: updatedUser.avatarURL,
  })
}

module.exports = avatarController
