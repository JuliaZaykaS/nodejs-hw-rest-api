const express = require('express')
const router = express.Router()
const { checkUserValidation } = require('../../middlewares')
const { asyncWrapper } = require('../../helpers')
const { tokenValidation, uploadAvatar } = require('../../middlewares')

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
  avatarController,
} = require('../../controllers/users')

router.post('/signup', checkUserValidation, asyncWrapper(registrationController))

router.post('/login', checkUserValidation, asyncWrapper(loginController))

router.patch('/', tokenValidation, asyncWrapper(subscriptionController))

router.patch('/avatars', tokenValidation, uploadAvatar.single('avatar'), asyncWrapper(avatarController))

router.post('/logout', tokenValidation, asyncWrapper(logoutController))

router.post('/current', tokenValidation, asyncWrapper(currentController))

module.exports = router
