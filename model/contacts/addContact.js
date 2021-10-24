const { Contact } = require('../../db')

const addContact = async (body) => {
  const { name, email, phone } = body
  const contact = new Contact({ name, email, phone })
  await contact.save()

  return contact
}

module.exports = addContact
