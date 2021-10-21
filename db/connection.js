const mongoose = require('mongoose')
require('dotenv').config()

const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@zaykacluster.t7imb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const connectMongoDB = async () => {
  await mongoose.connect(DB_URI, { useNewURLParser: true, useUnifiedTopology: true })
}

module.exports = { connectMongoDB }
