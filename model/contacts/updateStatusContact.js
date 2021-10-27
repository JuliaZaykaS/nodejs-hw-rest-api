const { Contact } = require('../../db')

const updateStatusContact = async (contactId, body, owner) => {
  const { favorite } = body

  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner }, { $set: { favorite: favorite } }, { new: true })

  return updatedContact
}

module.exports = updateStatusContact
