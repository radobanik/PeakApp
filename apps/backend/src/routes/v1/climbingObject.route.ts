import { Router } from 'express'
import { ClimbingObjectController } from '../../controllers'
import { Role } from '@prisma/client'
import checkRoles from '../../middlewares/checkRoles'

const climbingOutObjectRouter = Router()

climbingOutObjectRouter.get('/', ClimbingObjectController.listForAllUsers)
climbingOutObjectRouter.get(
  '/backoffice',
  checkRoles([Role.ADMIN]),
  ClimbingObjectController.listForBackOffice
)
climbingOutObjectRouter.get('/:id', ClimbingObjectController.getById)
climbingOutObjectRouter.post('/', ClimbingObjectController.create)
climbingOutObjectRouter.put('/:id', ClimbingObjectController.update)
climbingOutObjectRouter.delete('/:id', ClimbingObjectController.deleteById)
climbingOutObjectRouter.patch(
  '/:id/approval',
  checkRoles([Role.ADMIN]),
  ClimbingObjectController.changeApprovalState
)

export default climbingOutObjectRouter
