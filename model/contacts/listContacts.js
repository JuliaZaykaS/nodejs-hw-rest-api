const { Contacts } = require('../../db/schema')

// const listContacts = async (req, res) => {
const listContacts = async () => {
  const contacts = await Contacts.find({})
  // console.log(contacts)
  return contacts
//   res.json({ contacts })
}

module.exports = listContacts

// BEFORE MONGODB
// const contacts = require('../../db/contacts.json')

// const listContacts = async () => contacts

// module.exports = listContacts
