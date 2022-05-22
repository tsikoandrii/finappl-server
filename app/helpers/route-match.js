import { matchPattern } from 'url-matcher'

export default (req, obj) => {
  const { path, pathRegexp, method } = obj
  const urlMatch = pathRegexp
    ? matchPattern(pathRegexp, req.originalUrl)
    : path === req.originalUrl
  return urlMatch && req.method === method
}
