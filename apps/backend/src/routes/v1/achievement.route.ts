import { Router } from 'express'
import { AchievementController } from '../../controllers'
import passport from 'passport'
import checkRoles from '../../middlewares/checkRoles'
import { Role } from '@prisma/client'
import checkAuthenticated from '../../middlewares/checkAuthenticated'

const achievementRoute = Router()

achievementRoute.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  AchievementController.create
)

achievementRoute.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  AchievementController.update
)

achievementRoute.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  AchievementController.deleteById
)

achievementRoute.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkAuthenticated(),
  AchievementController.getUserAchievements
)

achievementRoute.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  AchievementController.getAllAchievements
)

export default achievementRoute
