import express from 'express'
import { register, login, validate } from '../controllers/user.controller'

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

router.get('/test', async (req, res) => {
  return res.send(req.ipInfo)
})

export default router
