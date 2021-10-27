const { Contact } = require('../../db')

const updateContact = async (contactId, body, owner) => {
  const { name, email, phone } = body

  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner }, { $set: { name, email, phone } }, { new: true })

  return updatedContact
}

module.exports = updateContact
