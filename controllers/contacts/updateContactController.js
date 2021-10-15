// const { updateContact } = require('../../model/contacts')
const { updateContact, getContactById } = require('../../model/contacts')

const updateContactController = async (req, res, next) => {
  const { name, email, phone } = req.body

  const { contactId } = req.params

  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields', code: 400 })
  }

  // const updatedContact = await updateContact(contactId, req.body)
  await updateContact(contactId, req.body)
  const updatedContact = await getContactById(contactId)
  // await updateContact(contactId, req.body)
  // console.log(updatedContact)
  // const updatedContact = await updateContact(Number(contactId), req.body)

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({ contact: updatedContact, message: 'success', code: 200 })
}

module.exports = updateContactController
