const { logout } = require('../../model/users')
const { HTTPCodes } = require('../../helpers')

const logoutController = async (req, res, next) => {
  await logout(req.user)

  res.status(HTTPCodes.NoContent).json({
  // res.status(204).json({
    message: 'No Content',
  })
}

module.exports = logoutController
