import { Router } from 'express'
import { RouteController } from '../../controllers/index'

const routeRouter = Router()

routeRouter.get('/', RouteController.list)
routeRouter.get('/:id', RouteController.getById)
routeRouter.post('/', RouteController.create)
routeRouter.put('/:id', RouteController.update)
routeRouter.delete('/:id', RouteController.deleteById)
routeRouter.patch('/:id/approval', RouteController.changeApprovalState)

export default routeRouter
