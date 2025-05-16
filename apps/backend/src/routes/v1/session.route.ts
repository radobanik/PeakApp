import { Router } from 'express'
import { ActivityController, SessionController } from '../../controllers'
import passport from 'passport'

const sessionRouter = Router()

sessionRouter.get('/', passport.authenticate('jwt', { session: false }), SessionController.list)
sessionRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  SessionController.getById
)
sessionRouter.get(
  '/:id/activities',
  passport.authenticate('jwt', { session: false }),
  ActivityController.getBySessionId
)
sessionRouter.post('/', passport.authenticate('jwt', { session: false }), SessionController.create)
sessionRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  SessionController.update
)
sessionRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  SessionController.deleteById
)

export default sessionRouter
