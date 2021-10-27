const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
  owner: {
    // type: SchemaTypes.ObjectId,
    // type: Schema.Types.ObjectId,
    // type: mongoose.SchemaTypes.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

contactsSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contact', contactsSchema)

module.exports = { Contact }
