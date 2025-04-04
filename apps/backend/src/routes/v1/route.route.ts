import { Router } from 'express'
import { RouteController } from '../../controllers/index'

const routeRouter = Router()

routeRouter.get('/', RouteController.list)
routeRouter.get('/:id', RouteController.getById)
routeRouter.post('/', RouteController.create)
routeRouter.put('/:id', RouteController.update)
routeRouter.delete('/:id', RouteController.deleteById)

export default routeRouter
