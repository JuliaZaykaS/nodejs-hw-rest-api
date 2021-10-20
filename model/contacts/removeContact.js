const { Contact } = require('../../db/schema')

const removeContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndRemove(contactId)

  return deletedContact
}

module.exports = removeContact
