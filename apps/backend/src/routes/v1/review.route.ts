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

export default reviewRouter
