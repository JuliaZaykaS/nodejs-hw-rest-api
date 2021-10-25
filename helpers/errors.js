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
class AuthorizationError extends ApiErrors {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

module.exports = {
  ApiErrors,
  ValidationError,
  AuthorizationError,
}
