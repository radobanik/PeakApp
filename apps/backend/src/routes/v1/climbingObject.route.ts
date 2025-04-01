import { Router } from 'express'
import { ClimbingObjectController } from '../../controllers'

const climbingOutObjectRouter = Router()

climbingOutObjectRouter.get('/', ClimbingObjectController.list)
climbingOutObjectRouter.get('/:id', ClimbingObjectController.getById)
climbingOutObjectRouter.post('/', ClimbingObjectController.create)
climbingOutObjectRouter.put('/:id', ClimbingObjectController.update)
climbingOutObjectRouter.delete('/:id', ClimbingObjectController.deleteById)

export default climbingOutObjectRouter
