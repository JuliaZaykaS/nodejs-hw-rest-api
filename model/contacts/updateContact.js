// let contacts = require('../contacts.json')
const contacts = require('../../db/contacts.json')

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body

  const updatedContact = contacts.find(contact => contact.id === contactId)

  if (!updatedContact) return
  updatedContact.name = name
  updatedContact.email = email
  updatedContact.phone = phone

  return updatedContact
}

module.exports = updateContact
