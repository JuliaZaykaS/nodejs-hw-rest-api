const { logout } = require('../../model/users')

const logoutController = async (req, res, next) => {
// console.log(req.body);
  await logout(req.user)
  //   return res.status(204).json({ message: 'No Content' })
  //   res.status(200).json({
  //     message: 'No Content',
  //     status: 'success'
  //   })
  res.status(204).json({
    message: 'No Content, logout success',
  })
}

module.exports = logoutController
