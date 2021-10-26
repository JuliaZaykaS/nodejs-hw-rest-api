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
const { checkContactValidation, checkContactFavoriteValidation } = require('../../middlewares/contactValidation')
const { asyncWrapper } = require('../../helpers/asyncWrapper')
const tokenValidation = require('../../middlewares/tokenValidation')

router.use(tokenValidation)
// router.use(asyncWrapper(tokenValidation))
router.get('/', asyncWrapper(getContactsController))

router.get('/:contactId', asyncWrapper(getContactByIdController))

router.post('/', checkContactValidation, asyncWrapper(addContactController))

router.delete('/:contactId', asyncWrapper(removeContactController))

router.patch('/:contactId', checkContactValidation, asyncWrapper(updateContactController))

router.patch('/:contactId/favorite', checkContactFavoriteValidation, asyncWrapper(updateStatusContactController))

module.exports = router
