const { Contact } = require('./contactSchema.js')
const { User } = require('./userSchema.js')
const { connectMongoDB } = require('./connection.js')

module.exports = {
  Contact,
  User,
  connectMongoDB,
}
