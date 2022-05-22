import express from 'express'
import {
  register,
  login,
  refreshToken,
  createResetLink,
  reset,
  validate,
} from '../controllers/user.controller'

const router = express.Router()

router.post('/', validate('register'), async (req, res, next) => {
  await register(req, res, next)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.post('/login', validate('register'), async (req, res, next) => {
  await login(req, res)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.get('/refresh', async (req, res, next) => {
  await refreshToken(req)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.post('/reset', validate('createResetLink'), async (req, res, next) => {
  await createResetLink(req)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.put('/reset/:id', validate('reset'), async (req, res, next) => {
  await reset(req, res)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.get('/test', async (req, res) => {
  return res.send(req.ipInfo)
})

router.get('/test/:id', async (req, res) => {
  return res.send(req.ipInfo)
})

export default router
