const { listContacts } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user

  let { page = 1, limit = 20, favorite } = req.query
  console.log('favorite', favorite)

  limit = limit > 20 ? 20 : limit

  const contacts = await listContacts(owner, page, limit, favorite)

  res.status(HTTPCodes.OK).json(
    { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  )
}

module.exports = getContactsController
