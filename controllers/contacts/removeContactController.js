const { removeContact } = require('../../model/contacts')

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params

  // const deletedContact = await removeContact(Number(contactId))
  const deletedContact = await removeContact(contactId)

  if (!deletedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({ message: 'contact deleted', code: 200 })
}

module.exports = removeContactController
