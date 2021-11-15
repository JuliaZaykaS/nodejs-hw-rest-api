const registrationController = require('./registrationController')
const loginController = require('./loginController')
const logoutController = require('./logoutController')
const currentController = require('./currentController')
const subscriptionController = require('./subscriptionController')
const avatarController = require('./avatarController')
const verificationController=require('./verificationController')

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
  avatarController,
  verificationController,
}
