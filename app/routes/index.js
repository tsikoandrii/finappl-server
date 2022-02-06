import express from 'express'
import UserRoutes from './user.routes'

import AuthHandler from '../middlewares/auth'

const router = express.Router()

router.use(AuthHandler)
router.use('/', UserRoutes)

export default router
