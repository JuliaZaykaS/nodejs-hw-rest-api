const { Contact } = require('../../db')

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body

  const updatedContact = await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } }, { new: true })

  return updatedContact
}

module.exports = updateContact
