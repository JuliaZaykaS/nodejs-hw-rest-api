const { Contact } = require('../../db/schema')

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body

  const updatedContact = await Contact.findByIdAndUpdate(contactId, { $set: { favorite: favorite } }, { new: true })

  return updatedContact
}

module.exports = updateStatusContact
