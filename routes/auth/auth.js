const express = require('express')
const router = express.Router()
const { checkUserValidation } = require('../../middlewares/userValidation')
const { asyncWrapper } = require('../../helpers/asyncWrapper')

const {
  registrationController,
  loginController,
  logoutController,
} = require('../../controllers/users')

router.post('/signup', checkUserValidation, asyncWrapper(registrationController))

router.post('/login', checkUserValidation, asyncWrapper(loginController))

router.post('/logout', asyncWrapper(logoutController))

module.exports = router
