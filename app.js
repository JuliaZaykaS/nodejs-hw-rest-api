const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const { connectMongoDB } = require('./db/connection')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// app.use(connectMongoDB())
// const start = async () => {
//   try {
//     await connectMongoDB()
//   } catch (error) {
//     console.error(`Failed to launch application with error: ${error.message}`)
//   }
// }
// start()
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
