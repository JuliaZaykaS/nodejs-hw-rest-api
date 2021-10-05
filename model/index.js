// const fs = require('fs/promises')
const contacts = require('./contacts.json')
// const path = require('path')
// const contactsPath = path.resolve('./contacts.json')

const listContacts = async () => {
// const listContacts = () => {
  // console.log(contacts)
  // return JSON.stringify(contacts)
  return contacts
  // try {
  //   return await fs.readFile(contactsPath, 'utf8')
  // } catch (error) {
  //   console.log(error)
  // }
}

const getContactById = async (contactId) => {
// const getContactById = (contactId) => {
  // const contact = contacts.filter(contact => contact.id === contactId)
  // const [contact] = contacts.filter(contact => contact.id === contactId)
  const contact = contacts.find(contact => contact.id === contactId)
  console.log(contact)
  return contact
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name: body.name,
    email: body.email,
    phone: body.phone
  }
  return newContact
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
