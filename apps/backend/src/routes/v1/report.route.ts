import { Router } from 'express'
import { ReportController } from '../../controllers/index'
import passport from 'passport'
import checkRoles from '../../middlewares/checkRoles'
import { Role } from '@prisma/client'

const reportRouter = Router()

reportRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  ReportController.list
)

reportRouter.get(
  '/user-pending',
  passport.authenticate('jwt', { session: false }),
  ReportController.getPendingFromUser
)

reportRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  ReportController.getById
)

reportRouter.post('/', passport.authenticate('jwt', { session: false }), ReportController.create)

reportRouter.patch(
  '/:id/resolve',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  ReportController.resolve
)

export default reportRouter
