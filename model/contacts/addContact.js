// const {Contacts} = require('../../db/schema')

// const addContact = async (body) => {
//   const { name, email, phone } = body
//   const newContact = {
//     id: contacts[contacts.length - 1].id + 1,
//     name: name,
//     email: email,
//     phone: phone,
//   }

//   contacts.push(newContact)

//   return newContact
// }

// module.exports = addContact

// BEFORE MONGODB
const contacts = require('../../db/contacts.json')

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name: name,
    email: email,
    phone: phone,
  }

  contacts.push(newContact)

  return newContact
}

module.exports = addContact
