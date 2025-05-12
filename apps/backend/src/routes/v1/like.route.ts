import { Router } from 'express'
import { LikeController } from '../../controllers'
import passport from 'passport'

const likeRouter = Router()

likeRouter.post('/:id', passport.authenticate('jwt', { session: false }), LikeController.like)

likeRouter.delete('/:id', passport.authenticate('jwt', { session: false }), LikeController.unlike)

export default likeRouter
