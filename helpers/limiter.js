const rateLimit = require('express-rate-limit')
const { LimiterError } = require('./errors')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    throw new LimiterError('Нou have exhausted the number of requests in 15 minutes')
  }
})

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  // max: 5, // start blocking after 5 requests
  max: 100,
  handler: (req, res, next) => {
    throw new LimiterError('Too many accounts created from this IP, please try again after an hour')
  }
})

module.exports = { apiLimiter, createAccountLimiter }
