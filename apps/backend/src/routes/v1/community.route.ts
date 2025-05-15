import { Router } from 'express'
import { CommunityController } from '../../controllers/index'

const communityRouter = Router()

communityRouter.get('/', CommunityController.list)

export default communityRouter
