import { Router } from 'express'
import { RouteController } from '../../controllers/index'
import checkRoles from '../../middlewares/checkRoles'
import { Role } from '@prisma/client'

const routeRouter = Router()

routeRouter.get('/', RouteController.listForAllUsers)
routeRouter.get('/mine', RouteController.listMine)
routeRouter.get('/backoffice', checkRoles([Role.ADMIN]), RouteController.listForBackOffice)
routeRouter.get('/:id', RouteController.getById)
routeRouter.post('/', RouteController.create)
routeRouter.put('/:id', RouteController.update)
routeRouter.delete('/:id', RouteController.deleteById)
routeRouter.patch('/:id/approval', checkRoles([Role.ADMIN]), RouteController.changeApprovalState)

export default routeRouter
