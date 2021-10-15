const { Contacts } = require('../../db/schema')

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body

  // const updatedContact = await Contacts.findByIdAndUpdate({ _id: contactId }, { $set: { name, email, phone } })
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
  // console.log(updatedContact)
  // await Contacts.findByIdAndUpdate(contactId, { $set: { name, email, phone } })

  // if (!updatedContact) return
  // updatedContact.name = name
  // updatedContact.email = email
  // updatedContact.phone = phone

  return updatedContact
}

module.exports = updateContact

// BEFORE MONGODB
// // let contacts = require('../contacts.json')
// const contacts = require('../../db/contacts.json')

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body

//   const updatedContact = contacts.find(contact => contact.id === contactId)

//   if (!updatedContact) return
//   updatedContact.name = name
//   updatedContact.email = email
//   updatedContact.phone = phone

//   return updatedContact
// }

// module.exports = updateContact
