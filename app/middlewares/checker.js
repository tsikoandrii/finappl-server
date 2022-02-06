import { validationResult } from 'express-validator'
import { ClientError } from '../helpers/error-types'

const ErrorChecker = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  throw new ClientError(errors)
}

export default ErrorChecker
