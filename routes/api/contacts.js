const express = require('express')
const router = express.Router()
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contacts')
const checkContactValidation = require('../../middlewares/validation')

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', checkContactValidation, addContactController)

router.delete('/:contactId', removeContactController)

router.patch('/:contactId', checkContactValidation, updateContactController)

module.exports = router
