const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { nameValidation, phoneValidation, emailValidation } = require('../helpers')

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

contactsSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contact', contactsSchema)

module.exports = { Contact }
