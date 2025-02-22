const app = require('../app')
const { connectMongoDB } = require('../db')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectMongoDB()
    console.log('Database connection successful')

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`)
    process.exit(1)
  }
})()
