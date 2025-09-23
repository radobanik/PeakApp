import { Router } from 'express'
import { CommentController } from '../../controllers'
import passport from 'passport'

const commentRouter = Router()

commentRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  CommentController.listBySession
)

commentRouter.post('/', passport.authenticate('jwt', { session: false }), CommentController.create)
commentRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  CommentController.update
)
commentRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  CommentController.deleteById
)

export default commentRouter
