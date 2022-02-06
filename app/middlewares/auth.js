import TokenService from '../services/token.service'
import { ClientError } from '../helpers/error-types'

const unprotectedRoutes = ['/api', '/api/login']

export default (req, res, next) => {
  const { authorization } = req.headers

  if (unprotectedRoutes.includes(req.originalUrl)) return next()

  if (!authorization) throw new ClientError('Немає авторизації', 403)

  const token = authorization.split(' ')[1]

  if (!token) throw new ClientError('Немає авторизації', 403)

  const result = TokenService.verifyToken(token).catch(next)

  req.user = result.user
  return next()
}
