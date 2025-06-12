import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { ReviewRepository, RouteRepository } from '../repositories'
import {
  defaultRouteListParams,
  getOrderBy,
  IncommingRouteListParams,
  NonNullRouteListParams,
  RouteCreate,
  routeCreateValidate,
  RouteUpdate,
  routeUpdateValidate,
} from '../model/route'
import requestValidator from '../model/common/validator'
import { RouteOrder, RouteWhere } from '../repositories/route.repository'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'
import { ApprovalState } from '@prisma/client'
import { getFeatureFlags } from '../utils/featureFlags'

const getById = async (req: Request, res: Response) => {
  const routeId = req.params.id
  const route = await RouteRepository.getById(routeId)

  if (route == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(route)
  }
}

const list = async (req: Request, res: Response, backOfficeList: boolean) => {
  const params = req.query as unknown as IncommingRouteListParams
  const normalizedParams: NonNullRouteListParams = defaultRouteListParams(params)
  const featureFlags = await getFeatureFlags()

  const where: RouteWhere = {
    AND: [
      {
        AND: [
          { name: { contains: normalizedParams.name as string, mode: 'insensitive' } },
          { longitude: { gte: normalizedParams.longitudeFrom, lte: normalizedParams.longitudeTo } },
          { latitude: { gte: normalizedParams.latitudeFrom, lte: normalizedParams.latitudeTo } },
          { climbingStructureType: { in: normalizedParams.climbingStructureTypes } },
          {
            approvalState:
              featureFlags.showApprovedOnly && !backOfficeList
                ? ApprovalState.APPROVED
                : { in: normalizedParams.approvalStates },
          },
          { deleted: false },
        ],
      },
    ],
  }

  const orderBy: RouteOrder[] = getOrderBy(normalizedParams.sort, normalizedParams.order)
  orderBy.push({ id: 'asc' })

  const routeListResult = await RouteRepository.list(
    where,
    orderBy,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(routeListResult)
}

const listForAllUsers = async (req: Request, res: Response) => {
  await list(req, res, false)
}
const listForBackOffice = async (req: Request, res: Response) => {
  await list(req, res, true)
}

const create = async (req: Request<RouteCreate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const routeData: RouteCreate = req.body

  const validatedData = requestValidator(() => routeCreateValidate(routeData), res)
  if (!validatedData) return

  const route = await RouteRepository.create(routeData, userRef)
  res.status(HTTP_STATUS.CREATED_201).json(route)
}

const update = async (req: Request<{ id: string }, object, RouteUpdate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const routeData = req.body
  const routeId = req.params.id

  const validatedData = requestValidator(() => routeUpdateValidate(routeData), res)
  if (!validatedData) return

  const exists = await RouteRepository.exists(routeId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
    return
  }

  const route = await RouteRepository.update(routeId, routeData, userRef)
  res.status(HTTP_STATUS.OK_200).json(route)
}

const deleteById = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const routeId = req.params.id
  const exists = await RouteRepository.exists(routeId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
    return
  }

  await RouteRepository.deleteById(routeId, userRef)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
}

const changeApprovalState = async (
  req: Request<{ id: string }, object, { approvalState: ApprovalState }>,
  res: Response
) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }
  const routeId = req.params.id
  const route = await RouteRepository.getById(routeId)

  if (route == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Route not found' })
    return
  }

  const approvalState = req.query.approvalState as ApprovalState
  if (
    approvalState === 'PENDING' ||
    route.approvalState != 'PENDING' ||
    route.climbingObject.approvalState != ApprovalState.APPROVED
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Invalid state or blocked' })
    return
  }

  const updated = await RouteRepository.changeApprovalState(routeId, approvalState, userRef)
  res.status(HTTP_STATUS.OK_200).json(updated)
  return
}

const recalculateAverages = async (routeId: string) => {
  const reviews = await ReviewRepository.getByRouteId(routeId)
  if (!reviews || reviews.length === 0) {
    return
  }

  const newTotals = reviews.reduce(
    (totals, review) => {
      totals.stars += review.stars
      totals.gradeRating += review.gradeRating.rating ?? 0
      totals.count += 1
      return totals
    },
    { stars: 0, gradeRating: 0, count: 0 }
  )

  const averageRating = newTotals.count > 0 ? newTotals.stars / newTotals.count : 0
  const averageGradeRating = newTotals.count > 0 ? newTotals.gradeRating / newTotals.count : 0

  await RouteRepository.updateAverages(routeId, averageRating, averageGradeRating)
}

const listMine = async (req: Request, res: Response) => {
  const params = req.query as unknown as IncommingRouteListParams
  const normalizedParams: NonNullRouteListParams = defaultRouteListParams(params)
  const featureFlags = await getFeatureFlags()
  const userRef = provideUserRefFromToken(req as unknown as Request)

  if (userRef === null) {
    res.status(HTTP_STATUS.UNAUTHORIZED_401).json({ error: 'Unauthorized' })
    return
  }

  const where: RouteWhere = {
    AND: [
      {
        AND: [
          { createdById: userRef.id },
          (featureFlags.showApprovedOnly && { approvalState: ApprovalState.APPROVED }) || {},
          { deleted: false },
        ],
      },
    ],
  }

  const orderBy: RouteOrder[] = getOrderBy(normalizedParams.sort, normalizedParams.order)
  orderBy.push({ id: 'asc' })

  const routeListResult = await RouteRepository.list(
    where,
    orderBy,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(routeListResult)
}

export default {
  getById,
  create,
  update,
  deleteById,
  listForAllUsers,
  listMine,
  listForBackOffice,
  changeApprovalState,
  recalculateAverages,
}
