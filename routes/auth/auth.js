const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
} = require('../../controllers/users')

router.post('/signup', registrationController)

router.post('/login', loginController)

router.post('/logout', logoutController)

module.exports = router
