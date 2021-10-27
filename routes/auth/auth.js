const express = require('express')
const router = express.Router()
const { checkUserValidation } = require('../../middlewares/userValidation')
const { asyncWrapper } = require('../../helpers/asyncWrapper')
const tokenValidation = require('../../middlewares/tokenValidation')

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
} = require('../../controllers/users')

router.post('/signup', checkUserValidation, asyncWrapper(registrationController))

router.post('/login', checkUserValidation, asyncWrapper(loginController))

router.patch('/', tokenValidation, asyncWrapper(subscriptionController))

router.post('/logout', tokenValidation, asyncWrapper(logoutController))
router.post('/current', tokenValidation, asyncWrapper(currentController))

module.exports = router
