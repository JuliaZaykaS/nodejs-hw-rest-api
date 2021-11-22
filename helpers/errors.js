const HTTPCodes = require('./HTTP-codes')
class ApiErrors extends Error {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.BadRequest
  }
}
class ValidationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.BadRequest
  }
}
class AuthenticationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.Conflict
  }
}
class AuthorizationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.Unauthorized
  }
}
class LimiterError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.TooManyRequests
  }
}
class VerificationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.NotFound
  }
}

module.exports = {
  ApiErrors,
  ValidationError,
  AuthorizationError,
  AuthenticationError,
  LimiterError,
  VerificationError,
}
