const { HTTPCodes } = require('./index')

class ApiErrors extends Error {
  constructor(message) {
    super(message)
    // this.status = 400
    this.status = HTTPCodes.BadRequest
  }
}
class ValidationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.BadRequest
    // this.status = 400
  }
}
class AuthenticationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.Conflict
    // this.status = 409
  }
}
class AuthorizationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.Unauthorized
    // this.status = 401
  }
}
class LimiterError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.TooManyRequests
    // this.status = 429
  }
}
class VerificationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = HTTPCodes.NotFound
    // this.status = 404
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
