const { getContactById } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
  const { _id: owner } = req.user

  const contact = await getContactById(id, owner)
  if (!contact) {
    return res.status(HTTPCodes.NotFound).json({ message: 'Not found', code: HTTPCodes.NotFound })
  }
  return res.status(HTTPCodes.OK).json({ contact: contact, message: 'success', code: HTTPCodes.OK })
}

module.exports = getContactByIdController
