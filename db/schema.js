const mongoose = require('mongoose')
const { nameValidation, phoneValidation, emailValidation } = require('../helpers/validations-constants.js')

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    match: nameValidation,
  },
  email: {
    type: String,
    match: emailValidation,
  },
  phone: {
    type: String,
    match: phoneValidation,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const Contact = mongoose.model('Contact', contactsSchema)
module.exports = { Contact }
