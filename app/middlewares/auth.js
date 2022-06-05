import TokenService from '../services/token.service'
import { ClientError } from '../helpers/error-types'
import routeMatch from '../helpers/route-match'

const unprotectedRoutes = [
  { path: '/api', method: 'POST' },
  { path: '/api/login', method: 'POST' },
  { path: '/api/refresh', method: 'GET' },
  { pathRegexp: '/api/reset/*', method: 'PUT' },
  { path: '/api/reset', method: 'POST' },
]

export default (req, res, next) => {
  const { authorization } = req.headers

  const isUnprotectedRoute = unprotectedRoutes.some((route) =>
    routeMatch(req, route)
  )

  if (isUnprotectedRoute) return next()

  if (!authorization) throw new ClientError('Немає авторизації', 403)

  const token = authorization.split(' ')[1]

  if (!token) throw new ClientError('Немає авторизації', 403)

  const result = TokenService.verifyToken(token)

  req.user = result.data._id
  return next()
}
