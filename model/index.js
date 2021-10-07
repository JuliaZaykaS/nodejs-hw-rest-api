let contacts = require('./contacts.json')

const listContacts = async () => contacts

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const deletedContact = contacts.find(contact => contact.id === contactId)
  const newContacts = contacts.filter((contact) => contact.id !== contactId)
  contacts = [...newContacts]
  return deletedContact
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name: name,
    email: email,
    phone: phone,
  }

  contacts.push(newContact)

  return newContact
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body

  const updatedContact = contacts.find(contact => contact.id === contactId)

  if (!updatedContact) return
  updatedContact.name = name
  updatedContact.email = email
  updatedContact.phone = phone

  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
