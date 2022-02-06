class ClientError extends Error {
  constructor(errors, statusCode = 400, details = null) {
    super()
    this.errors = typeof errors === 'string' ? [errors] : errors
    this.statusCode = statusCode
    this.details = details
  }
}

class AuthorizationError extends Error {
  constructor(error, details = null) {
    super()
    this.error = error
    this.details = details
  }
}

export { ClientError, AuthorizationError }
