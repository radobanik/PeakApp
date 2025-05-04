import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { ReviewRepository, RouteRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import requestValidator from '../model/common/validator'
import { reviewCreateValidate, reviewUpdateValidate } from '../model/review'
import { createListResponse } from '../model/common/listResponse'
import {
  IncommingListParams,
  NonNullListParams,
  toNotNullListParams,
} from '../model/common/listParams'
import config from '../core/config'

const getAllForRoute = async (req: Request, res: Response) => {
  const routeId = req.params.id

  const params = req.query as unknown as IncommingListParams
  const normalizedParams: NonNullListParams = toNotNullListParams(params, config.LIST_LIMIT.DEFAULT)
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const reviews = await ReviewRepository.listByRouteId(
    routeId,
    requestUser,
    normalizedParams.page,
    normalizedParams.pageSize
  )
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

const create = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }

  const reviewCheck = await ReviewRepository.getUsersByRouteId(routeId, requestUser)
  if (reviewCheck != null) {
    res.status(HTTP_STATUS.CONFLICT_409).json({ error: 'Review already exists' })
    return
  }

  if (!RouteRepository.exists(routeId)) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
  }

  const route = await RouteRepository.getById(routeId)
  if (route == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
    return
  }

  const validatedData = requestValidator(() => reviewCreateValidate(req.body), res)
  if (!validatedData) return

  const createdReview = await ReviewRepository.create(validatedData, route, requestUser)
  res.status(HTTP_STATUS.CREATED_201).json(createdReview)
}

const update = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  const validatedData = requestValidator(() => reviewCreateValidate(req.body), res)
  if (!validatedData) return

  const updatedReview = await ReviewRepository.update(validatedData, routeId, requestUser)
  res.status(HTTP_STATUS.OK_200).json(updatedReview)
}

const deleteByRouteId = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  if (!(await ReviewRepository.exists(routeId, requestUser))) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Review not found' })
    return
  }

  await ReviewRepository.deleteByRouteId(routeId, requestUser)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default {
  getAllForRoute,
  getMeForRoute,
  create,
  update,
  deleteByRouteId,
}
