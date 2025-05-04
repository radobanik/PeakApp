import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { ReviewRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'

const getAllForRoute = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const reviews = await ReviewRepository.listByRouteId(routeId)
  res.status(HTTP_STATUS.OK_200).json(reviews)
}

const getMeForRoute = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const review = await ReviewRepository.getUsersByRouteId(routeId, requestUser)
  if (review == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Review not found' })
    return
  }
  res.status(HTTP_STATUS.OK_200).json(review)
}

export default {
  getAllForRoute,
  getMeForRoute,
}
