const { addContact } = require('../../model/contacts')

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field', code: 400 })
  }

  const newContact = await addContact(req.body)

  return res.status(201).json({ contacts: newContact, message: 'success', code: 201 })
}

module.exports = addContactController
