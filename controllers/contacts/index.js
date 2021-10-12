const updateContactController = require('./updateContactController.js')
const removeContactController = require('./removeContactController.js')
const addContactController = require('./addContactController.js')
const getContactByIdController = require('./getContactByIdController.js')
const getContactsController = require('./getContactsController.js')

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
}
