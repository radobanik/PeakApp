import { Router } from 'express'
import featureFlagsController from '../../controllers/featureFlags.controller'

const router = Router()

router.get('/', featureFlagsController.getFeatureFlags)

export default router
