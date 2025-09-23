import { Router } from 'express'
import GeoController from '../../controllers/geo.controller'

const geoRouter = Router()

geoRouter.get('/countries', GeoController.getAllCountries)
geoRouter.get('/countries/:countryId/cities', GeoController.getCitiesByCountry)
geoRouter.get('/cities/:cityId', GeoController.getCityById)

export default geoRouter
