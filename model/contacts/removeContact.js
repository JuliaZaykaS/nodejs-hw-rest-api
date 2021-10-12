let contacts = require('../../db/contacts.json')

const removeContact = async (contactId) => {
  const deletedContact = contacts.find(contact => contact.id === contactId)
  const newContacts = contacts.filter((contact) => contact.id !== contactId)
  contacts = [...newContacts]
  return deletedContact
}

module.exports = removeContact
