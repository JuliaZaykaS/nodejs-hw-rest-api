const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/auth/auth')
const { errorHandler } = require('./middlewares')
const { apiLimiter, createAccountLimiter } = require('./helpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(express.static('public'))

app.use('/users/signup', createAccountLimiter)
app.use('/api/contacts', apiLimiter)

app.use('/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
