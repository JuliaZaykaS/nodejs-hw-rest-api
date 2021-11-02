const { logout } = require('../../model/users')

const logoutController = async (req, res, next) => {
  await logout(req.user)

  res.status(204).json({
    message: 'No Content',
  })
}

module.exports = logoutController
