const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact
} = require('../../model/index')
const checkContactValidation = require('../../validation/validation')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()

  res.status(200).json(
    { contacts: contacts, message: 'success', code: 200 }
  )
})

router.get('/:contactId', async (req, res, next) => {
  const id = Number(req.params.contactId)

  const contact = await getContactById(id)
  if (!contact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }
  return res.status(200).json({ contact: contact, message: 'success', code: 200 })
})

router.post('/', checkContactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field', code: 400 })
  }

  const newContact = await addContact(req.body)

  return res.status(201).json({ contacts: newContact, message: 'success', code: 201 })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const deletedContact = await removeContact(Number(contactId))

  if (!deletedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({ message: 'contact deleted', code: 200 })
})

router.patch('/:contactId', checkContactValidation, async (req, res, next) => {
  const { name, email, phone } = req.body

  const { contactId } = req.params

  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields', code: 400 })
  }

  const updatedContact = await updateContact(Number(contactId), req.body)

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found', code: 404 })
  }

  return res.status(200).json({ contact: updatedContact, message: 'success', code: 200 })
})

module.exports = router
