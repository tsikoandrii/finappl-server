import express from 'express'
import {
  create,
  del,
  change,
  validate,
} from '../controllers/category.controller'

const router = express.Router()

router.post('/', validate('create'), async (req, res, next) => {
  await create(req, res)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.put('/:id', validate('change'), async (req, res, next) => {
  await change(req, res, next)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  await del(req, res, next)
    .then((data) => {
      return res.json(data)
    })
    .catch(next)
})

export default router
