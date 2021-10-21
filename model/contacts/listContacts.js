const { Contact } = require('../../db/schema')

const listContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}

module.exports = listContacts
