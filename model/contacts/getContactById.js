const { Contact } = require('../../db/schema')

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

module.exports = getContactById
