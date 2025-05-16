import { Router } from 'express'
import { ReviewController } from '../../controllers'
import passport from 'passport'

const reviewRouter = Router()

reviewRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ReviewController.getAllForRoute
)

reviewRouter.get(
  '/:id/me',
  passport.authenticate('jwt', { session: false }),
  ReviewController.getMeForRoute
)

reviewRouter.post(
  '/:id/me',
  passport.authenticate('jwt', { session: false }),
  ReviewController.create
)

reviewRouter.patch(
  '/:id/me',
  passport.authenticate('jwt', { session: false }),
  ReviewController.update
)

reviewRouter.delete(
  '/:routeId/:userId',
  passport.authenticate('jwt', { session: false }),
  ReviewController.deleteByRouteUserId
)

export default reviewRouter
