const { Contact } = require('../../db')

const removeContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndRemove(contactId)

  return deletedContact
}

module.exports = removeContact
