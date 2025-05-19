import { Router } from 'express'
import { CommunityController } from '../../controllers/index'

const communityRouter = Router()

communityRouter.get('/', CommunityController.list)
communityRouter.get('/:id', CommunityController.getById)

export default communityRouter
