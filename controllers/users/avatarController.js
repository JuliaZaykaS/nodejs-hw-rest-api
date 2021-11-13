const { avatar } = require('../../model/users')

const avatarController = async (req, res, next) => {
  const updatedUser = await avatar(req.user, req.file)

  return res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  })
}

module.exports = avatarController
