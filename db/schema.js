const mongoose = require('mongoose')
const { nameValidation, phoneValidation, emailValidation } = require('../helpers/validations-constants.js')

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Set name for contact'],
    match: nameValidation,
  },
  email: {
    type: String,
    unique: true,
    match: emailValidation,
  },
  phone: {
    type: String,
    unique: true,
    match: phoneValidation,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const Contact = mongoose.model('contact', contactsSchema)

module.exports = { Contact }
