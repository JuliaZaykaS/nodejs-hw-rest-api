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
const { checkContactValidation, checkContactFavoriteValidation } = require('../../middlewares/validation')

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', checkContactValidation, addContactController)

router.delete('/:contactId', removeContactController)

router.patch('/:contactId', checkContactValidation, updateContactController)

router.patch('/:contactId/favorite', checkContactFavoriteValidation, updateStatusContactController)

module.exports = router
