const { updateContact } = require('../../model/contacts')

const updateContactController = async (req, res, next) => {
  const { name, email, phone } = req.body
  const { _id: owner } = req.user

  const { contactId } = req.params

  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields', code: 400 })
  }

  const updatedContact = await updateContact(contactId, req.body, owner)

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({ contact: updatedContact, message: 'success', code: 200 })
}

module.exports = updateContactController
