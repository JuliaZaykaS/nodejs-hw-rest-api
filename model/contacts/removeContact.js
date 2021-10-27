const { Contact } = require('../../db')

const removeContact = async (contactId, owner) => {
  const deletedContact = Contact.findOneAndRemove({ _id: contactId, owner })

  return deletedContact
}

module.exports = removeContact
