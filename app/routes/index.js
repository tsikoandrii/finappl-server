import express from 'express'
import UserRoutes from './user.routes'
import CategoryRoutes from './category.routes'
import OperationRoutes from './operation.routes'
import AccountRoutes from './account.routes'

import AuthHandler from '../middlewares/auth'

const router = express.Router()

router.use(AuthHandler)
router.use('/', UserRoutes)
router.use('/category', CategoryRoutes)
router.use('/operation', OperationRoutes)
router.use('/account', AccountRoutes)

export default router
