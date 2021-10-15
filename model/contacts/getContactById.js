const { Contacts } = require('../../db/schema')

const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId)
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
