const { Contact } = require('../../db/schema')

const removeContact = async (contactId) => {
  const deletedContact = Contact.findByIdAndRemove(contactId)
  // const newContacts = contacts.filter((contact) => contact.id !== contactId)
  // contacts = [...newContacts]
  return deletedContact
}

module.exports = removeContact

// BEFORE MONGODB
// let contacts = require('../../db/contacts.json')

// const removeContact = async (contactId) => {
//   const deletedContact = contacts.find(contact => contact.id === contactId)
//   const newContacts = contacts.filter((contact) => contact.id !== contactId)
//   contacts = [...newContacts]
//   return deletedContact
// }

// module.exports = removeContact
