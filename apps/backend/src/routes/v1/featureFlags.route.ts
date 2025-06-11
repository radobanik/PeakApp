import { Router } from 'express'
import featureFlagsController from '../../controllers/featureFlags.controller'
import passport from 'passport'
import checkRoles from '../../middlewares/checkRoles'
import { Role } from '@prisma/client'

const router = Router()

router.get('/', featureFlagsController.getFeatureFlags)

router.put(
  '/:name',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  featureFlagsController.updateFeatureFlag
)

export default router
