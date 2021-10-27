const { listContacts } = require('../../model/contacts')

const getContactsController = async (req, res, next) => {

  const { _id: owner } = req.user
  const contacts = await listContacts(owner)

  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
}

module.exports = getContactsController
