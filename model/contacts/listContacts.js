const { Contact } = require('../../db')

const listContacts = async (owner, page, limit, favorite) => {
  const contacts = await Contact.paginate({ owner, favorite }, { page, limit })
  // const contacts = await Contact.find({ owner })

  return contacts
}
// const listContacts = async () => {
//   const contacts = await Contact.find({})
//   return contacts
// }

module.exports = listContacts
