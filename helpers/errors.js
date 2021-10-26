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

module.exports = {
  ApiErrors,
  ValidationError,
  AuthorizationError,
  AuthenticationError,
}
