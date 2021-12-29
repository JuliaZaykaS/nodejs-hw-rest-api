const { listContacts } = require('../../model/contacts')
const { HTTPCodes } = require('../../helpers')

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user
  let { page, limit, favorite } = req.query
  if (!page) {
    page = 1
  }
  if (!limit) {
    limit = 20
  }
  if (!favorite) {
    favorite = undefined
  }
  limit = limit > 20 ? 20 : limit

  const contacts = await listContacts(owner, page, limit, favorite)

  return res.status(HTTPCodes.OK).json(
    { contacts: contacts, message: 'success', code: HTTPCodes.OK }
  )
}

module.exports = getContactsController
