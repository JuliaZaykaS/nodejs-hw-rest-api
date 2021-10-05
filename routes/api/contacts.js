const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  // removeContact,
  // updateContact,
  addContact
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  // console.log(contacts)
  // res.json({ contacts: contacts, message: 'template message' })
  res.json(
    { contacts: contacts, message: 'success' }
  )
})

router.get('/:contactId', async (req, res, next) => {
  const id = Number(req.params.contactId)
  // const id = req.params.contactId
  // console.log(id)
  const contact = await getContactById(id)
  if (!contact) {
    res.statusCode = 404
    return res.json({ message: 'Not found' })
  }
  return res.json({ contact: contact, message: 'success' })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  console.log(req.body)
  if (!name || !email || !phone) {
    res.statusCode = 400
    return res.json({ message: 'missing required name field' })
  }
  const newContact = await addContact(req.body)
  const contacts = await listContacts()
  res.json({ contacts: [...contacts, newContact], message: 'success' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
