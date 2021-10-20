const { updateStatusContact } = require('../../model/contacts')
// const { updateStatusContact, getContactById } = require('../../model/contacts')

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params
  // console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }
  const updatedContact = await updateStatusContact(contactId, req.body)
  // await updateStatusContact(contactId, req.body)
  // const updatedContact = await getContactById(contactId)
  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }
  return res.status(200).json({ contact: updatedContact, message: 'success' })
}

module.exports = updateStatusContactController
