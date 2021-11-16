const { addContact } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body
  const { _id: owner } = req.user

  if (!name || !email || !phone) {
    return res.status(HTTPCodes.BadRequest).json({ message: 'missing required name field', code: HTTPCodes.BadRequest })
  }

  const newContact = await addContact(req.body, owner)

  return res.status(HTTPCodes.Created).json({ contacts: newContact, message: 'success', code: HTTPCodes.Created })
}

module.exports = addContactController
