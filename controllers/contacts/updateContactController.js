const { updateContact } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const updateContactController = async (req, res, next) => {
  const { name, email, phone } = req.body
  const { _id: owner } = req.user

  const { contactId } = req.params

  if (!name && !email && !phone) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'missing fields', code: HTTPCodes.BadRequest })
  }

  const updatedContact = await updateContact(contactId, req.body, owner)

  if (!updatedContact) {
    return res.status(HTTPCodes.NotFound).json({ message: 'Not found', code: HTTPCodes.NotFound })
  }

  return res.status(HTTPCodes.OK).json({ contact: updatedContact, message: 'success', code: HTTPCodes.OK })
}

module.exports = updateContactController
