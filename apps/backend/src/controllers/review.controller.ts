import { Request, Response } from 'express'
import { provideUserRefFromToken } from '../auth/authUtils'
import { ReviewRepository, RouteRepository, UserRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import requestValidator from '../model/common/validator'
import { reviewCreateValidate, reviewUpdateValidate } from '../model/review'
import {
  IncommingListParams,
  NonNullListParams,
  toNotNullListParams,
} from '../model/common/listParams'
import config from '../core/config'
import { RefObject } from '../model/common/refObject'
import { Role } from '@prisma/client'

const validateUser = async (
  userRef: RefObject,
  reviewUserId: string,
  res: Response
): Promise<boolean> => {
  const user = await UserRepository.getUserById(userRef.id)

  if (reviewUserId !== user!.id && !user!.roles.includes(Role.ADMIN)) {
    res.status(HTTP_STATUS.FORBIDDEN_403).json({ error: 'Forbidden' })
    return false
  }

  return true
}

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

  if (!(await RouteRepository.exists(routeId))) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
    return
  }
  const route = await RouteRepository.getById(routeId)
  if (route === null) {
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

  if (!(await ReviewRepository.exists(routeId, requestUser.id))) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Review not found' })
    return
  }

  const validatedData = requestValidator(() => reviewUpdateValidate(req.body), res)
  if (!validatedData) return

  const updatedReview = await ReviewRepository.update(validatedData, routeId, requestUser)
  res.status(HTTP_STATUS.OK_200).json(updatedReview)
}

const deleteByRouteUserId = async (req: Request, res: Response) => {
  const routeId = req.params.routeId
  const userId = req.params.userId

  const requestUser = provideUserRefFromToken(req)
  if (requestUser === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401)
    return
  }
  if (!(await ReviewRepository.exists(routeId, userId))) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Review not found' })
    return
  }

  if (!validateUser(requestUser, userId, res)) {
    return
  }
  await ReviewRepository.deleteByRouteId(routeId, userId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

export default {
  getAllForRoute,
  getMeForRoute,
  create,
  update,
  deleteByRouteUserId,
}
