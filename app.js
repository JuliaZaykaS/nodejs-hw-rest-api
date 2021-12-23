const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
// console.dir(swaggerUi.setup)
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
// const swaggerJsdoc = require('swagger-jsdoc')
// console.log(swaggerDocument)
// console.log(path)
// const p = path.join('./', 'swagger.json')
// console.log(p)
// const swaggerDocument = JSON.parse(
//   // fs.readFileSync(`${path.resolve()}/swagger.json`)
//   fs.readFileSync(p)
//   // fs.readFileSync('./swagger.json')
// )
const swaggerRouter = require('./routes/swagger')
const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/auth/auth')
const { errorHandler } = require('./middlewares')
const { apiLimiter, createAccountLimiter } = require('./helpers')

const app = express()
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Phonebook',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/*.js'], // files containing annotations as above
// }
// const options = {
//   definition: {
//     openapi: '3.0.0',
//   },
//   servers: [
//     {
//       url: 'http://localhost:5555',
//     },
//   ],
// }
// const swaggerSpec = swaggerJsdoc(options)

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(express.static('public'))

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api-docs', swaggerRouter)
app.use('/users/signup', createAccountLimiter)
app.use('/api/contacts', apiLimiter)

app.use('/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
