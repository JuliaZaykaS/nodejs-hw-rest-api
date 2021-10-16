const express = require('express')
const router = express.Router()
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contacts')
const checkContactValidation = require('../../middlewares/validation')

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', checkContactValidation, addContactController)

router.delete('/:contactId', removeContactController)

router.patch('/:contactId', checkContactValidation, updateContactController)

router.patch('/:contactId/favorite', updateStatusContactController)

module.exports = router
