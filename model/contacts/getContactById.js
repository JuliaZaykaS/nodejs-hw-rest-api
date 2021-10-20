const { Contact } = require('../../db/schema')

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

module.exports = getContactById

// BEFORE MONGODB
// const contacts = require('../../db/contacts.json')

// const getContactById = async (contactId) => {
//   const contact = contacts.find((contact) => contact.id === contactId)
//   return contact
// }

// module.exports = getContactById
