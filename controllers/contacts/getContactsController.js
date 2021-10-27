const { listContacts } = require('../../model/contacts')

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user
  console.log(req.query)
  let { page, limit, favorite } = req.query
  limit = limit > 20 ? 20 : limit

  const contacts = await listContacts(owner, page, limit, favorite)
  // const contacts = await listContacts(owner, page, limit > 2 ? 2 : limit)

  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
}

module.exports = getContactsController
