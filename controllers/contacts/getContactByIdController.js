const { getContactById } = require('../../model/contacts')

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId
   const { _id: owner } = req.user


  const contact = await getContactById(id, owner)
  if (!contact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }
  return res.status(200).json({ contact: contact, message: 'success', code: 200 })
}

module.exports = getContactByIdController
