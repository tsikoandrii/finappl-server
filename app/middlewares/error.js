import { AuthorizationError, ClientError } from '../helpers/error-types'

export default (err, req, res, next) => {
  console.log(err)
  if (err instanceof ClientError) {
    const { errors, statusCode } = err
    return res.status(statusCode).json({ errors })
  }
  if (err instanceof AuthorizationError) {
    const { error } = err

    const { refresh } = req.cookies
    if (!refresh) return res.status(403).json({ errors: [error] })

    return res.status(403).json({ errors: [refresh] })
  }
  res.status(500).json({ error: 'Щось пішло не-так' })
}
