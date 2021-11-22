const { ApiErrors, HTTPCodes } = require('../helpers')


const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiErrors) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(HTTPCodes.ServerError).json({ message: error.message })
}

module.exports = {
  errorHandler,
}
