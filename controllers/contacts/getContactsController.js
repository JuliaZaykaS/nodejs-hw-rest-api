const { listContacts } = require('../../model/contacts')

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts()

  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
}

module.exports = getContactsController
