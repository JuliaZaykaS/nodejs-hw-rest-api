const { avatar } = require('../../model/users')

const avatarController = async (req, res, next) => {
//   const { path: tempPath, originalname } = req.file
  // const { id } = req.params
//   console.log(req.file)
//   console.log(req.user)
//   console.log(req.user._id)
  const updatedUser = await avatar(req.user, req.file)
  // return res.status(200).json({
  //   updatedUser

  // })
  return res.status(200).json({
    avatarURL: updatedUser.avatarURL

  })
}

module.exports = avatarController
