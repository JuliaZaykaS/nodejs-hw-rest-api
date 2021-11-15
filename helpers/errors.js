class ApiErrors extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class ValidationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 400
  }
}
class AuthenticationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 409
  }
}
class AuthorizationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
class LimiterError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 429
  }
}
class VerificationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 404
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
