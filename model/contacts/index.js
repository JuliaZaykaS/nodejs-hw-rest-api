const listContacts = require('./listContacts.js')
const getContactById = require('./getContactById.js')
const removeContact = require('./removeContact.js')
const addContact = require('./addContact.js')
const updateContact = require('./updateContact.js')
const updateStatusContact = require('./updateStatusContact.js')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
