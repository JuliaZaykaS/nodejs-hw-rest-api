const { updateStatusContact } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: owner } = req.user

  if (!req.body.favorite) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'missing field favorite' })
  }
  const updatedContact = await updateStatusContact(contactId, req.body, owner)

  if (!updatedContact) {
    return res.status(HTTPCodes.NotFound).json({ message: 'Not found', code: HTTPCodes.NotFound })
  }
  return res.status(HTTPCodes.OK).json({ contact: updatedContact, message: 'success' })
}

module.exports = updateStatusContactController
