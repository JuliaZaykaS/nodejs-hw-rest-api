const mongoose = require('mongoose')

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewURLParser: true, useUnifiedTopology: true })
}

module.exports = { connectMongoDB }
