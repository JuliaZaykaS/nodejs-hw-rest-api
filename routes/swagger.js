const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
// const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDocument = require('../swagger.json')

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Hello World',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/routes*.js'], // files containing annotations as above
// }

// const openapiSpecification = swaggerJsdoc(options)

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

module.exports = router
