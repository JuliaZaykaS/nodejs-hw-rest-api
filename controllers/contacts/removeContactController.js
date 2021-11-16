const { removeContact } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: owner } = req.user

  const deletedContact = await removeContact(contactId, owner)

  if (!deletedContact) {
    return res.status(HTTPCodes.NotFound).json({ message: 'Not found', code: HTTPCodes.NotFound })
  }

  return res.status(HTTPCodes.OK).json({ message: 'contact deleted', code: HTTPCodes.OK })
}

module.exports = removeContactController
