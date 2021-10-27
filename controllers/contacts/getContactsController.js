const { listContacts } = require('../../model/contacts')

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user

  let { page = 1, limit = 20, favorite } = req.query

  limit = limit > 20 ? 20 : limit

  const contacts = await listContacts(owner, page, limit, favorite)

  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
}

module.exports = getContactsController
