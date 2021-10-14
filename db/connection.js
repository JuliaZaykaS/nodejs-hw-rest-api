require('dotenv').config()
const mongoose = require('mongoose')
// console.log(process.env.MONGO_URL)

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewURLParser: true, useUnifiedTopology: true })
//    return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/Phonebook?retryWrites=true&w=majority', { useNewURLParser: true, useUnifiedTopology: true })
//    return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/Phonebook', { useNewURLParser: true, useUnifiedTopology: true })
//    return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/Phonebook', { useNewURLParser: true, useUnifiedTopology: true })
// console.log(456)
//   return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/test', { useNewURLParser: true, useUnifiedTopology: true })
//   return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/Phonebook?retryWrites=true&w=majority', { useNewURLParser: true, useUnifiedTopology: true })
//   return mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/test')
//   await mongoose.connect('mongodb+srv://JuliaZayka:509julias@zaykacluster.t7imb.mongodb.net/test')
}

module.exports = { connectMongoDB }
