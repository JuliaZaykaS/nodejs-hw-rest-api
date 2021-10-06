const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  // updateContact,
  addContact
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  // console.log(contacts)
  // res.json({ contacts: contacts, message: 'template message' })
  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
})

router.get('/:contactId', async (req, res, next) => {
  const id = Number(req.params.contactId)
  // const id = req.params.contactId
  // console.log(id)
  const contact = await getContactById(id)
  if (!contact) {
    // res.statusCode = 404
    return res.status(404).json({ message: 'Not found', code: 404 })
  }
  return res.status(200).json({ contact: contact, message: 'success', code: 200 })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  console.log(req.body)
  if (!name || !email || !phone) {
    // res.statusCode = 400
    return res.status(400).json({ message: 'missing required name field', code: 400 })
  }

  const newContact = await addContact(req.body)
  const contacts = await listContacts()
  contacts.push(newContact)
  // const newContacts = await addContact(req.body)
  // console.log(newContacts)
  // return res.status(201).json({ contacts: [...contacts, newContact], message: 'success', code: 201 })
  // return res.status(201).json({ contacts: newContacts, message: 'success', code: 201 })
  return res.status(201).json({ contacts: newContact, message: 'success', code: 201 })
})

router.delete('/:contactId', async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (!contact) {
    // res.statusCode = 404
    return res.status(404).json({ message: 'Not found', code: 404 })
  }
  res.status(200).json({ message: 'contact deleted', code: 200 })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
