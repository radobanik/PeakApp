import { Router } from 'express'
import { SearchController } from '../../controllers/index'

const searchRouter = Router()

searchRouter.get('/', SearchController.getSearches)

export default searchRouter
