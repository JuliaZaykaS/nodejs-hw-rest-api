const { Contact } = require('../../db')

const listContacts = async (owner) => {
  const contacts = await Contact.find({ owner })
  return contacts
}
// const listContacts = async () => {
//   const contacts = await Contact.find({})
//   return contacts
// }

module.exports = listContacts
