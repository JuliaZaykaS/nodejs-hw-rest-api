const { Contacts } = require('../../db/schema')

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  // console.log(favorite)
  // console.log(body)
  // const contact = await Contacts.findById(contactId)

  const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { favorite: favorite } })
  // const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { favorite } })
  return updatedContact

  // if (!contact.favorite) {
  //   const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { favorite: true } })
  //   return updatedContact
  // } else {
  //   const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { favorite: false } })
  //   return updatedContact
  // }
}

module.exports = updateStatusContact
