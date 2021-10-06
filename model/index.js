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
  const contact = contacts.find((contact) => contact.id === contactId)
  // console.log(contact)
  return contact
}

const removeContact = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact
}

const addContact = async (body) => {
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name: body.name,
    email: body.email,
    phone: body.phone,
  }

  // const newContacts = [...contacts, newContact]
  // console.log(newContacts)
  // try {
  //   const newContacts = contacts.push(newContact)
  //   // await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')
  //   const a = await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')
  //   // const a = await fs.writeFile(contactsPath, newContacts, 'utf8')
  //   // console.log(a)
  //   // return JSON.parse(await fs.readFile(contactsPath, 'utf8'))
  //   const b = JSON.parse(await fs.readFile(contactsPath, 'utf8'))
  //   console.log(b)
  //   console.log(contacts)
  // } catch (error) {
  //   console.log(error)
  // }

  return newContact
  // return newContacts
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
