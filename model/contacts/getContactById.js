const { Contact } = require('../../db')

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner })
  return contact
}

module.exports = getContactById
