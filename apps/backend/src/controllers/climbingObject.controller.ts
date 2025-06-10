import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import { ClimbingObjectRepository, UserRepository } from '../repositories'
import {
  defaultClimbingObjectListParams,
  IncommingClimbingObjectListParams,
  ClimbingObjectCreate,
  climbingObjectCreateValidate,
  ClimbingObjectUpdate,
  climbingObjectUpdateValidate,
  NonNullClimbingObjectListParams,
  validateClimbingObjectListParams,
} from '../model/climbingObject'
import requestValidator from '../model/common/validator'
import { ClimbingObjectOrder, ClimbingObjectWhere } from '../repositories/climbingObject.repository'
import { RouteWhere } from '../repositories/route.repository'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'
import { getOrderBy } from '../model/route'
import { ApprovalState, Role } from '@prisma/client'

const getById = async (req: Request, res: Response) => {
  const params = req.query as unknown as IncommingClimbingObjectListParams
  const normalizedParams: NonNullClimbingObjectListParams = defaultClimbingObjectListParams(params)

  const climbingObjectId = req.params.id
  const climbingObject = await ClimbingObjectRepository.getById(climbingObjectId)

  if (climbingObject == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Climbing object not found' })
    return
  }

  normalizedParams.approvalStates = normalizedParams.routeApprovalStates.filter(
    (state) => state !== ApprovalState.REJECTED
  )
  console.log('normalizedParams', normalizedParams)
  const filteredRoutes = climbingObject.routes.filter(
    (route) =>
      route.grade.rating >= normalizedParams.ratingFrom &&
      route.grade.rating <= normalizedParams.ratingTo &&
      normalizedParams.climbingStructureTypes.includes(route.climbingStructureType) &&
      normalizedParams.routeApprovalStates.includes(route.approvalState)
  )

  res.status(HTTP_STATUS.OK_200).json({
    ...climbingObject,
    routes: filteredRoutes,
  })
}

const list = async (req: Request, res: Response) => {
  const params = req.query as unknown as IncommingClimbingObjectListParams
  const normalizedParams: NonNullClimbingObjectListParams = defaultClimbingObjectListParams(params)
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }
  const user = await UserRepository.getUserById(userRef.id)
  if (user === null) {
    returnUnauthorized(res)
    return
  }

  // Regular users should not see rejected climbing objects and routes on map
  if (!user.roles.includes(Role.ADMIN)) {
    normalizedParams.approvalStates = normalizedParams.approvalStates.filter(
      (state) => state !== ApprovalState.REJECTED
    )
    normalizedParams.routeApprovalStates = normalizedParams.routeApprovalStates.filter(
      (state) => state !== ApprovalState.REJECTED
    )
  }

  // console.log('normalizedParams', normalizedParams)

  try {
    validateClimbingObjectListParams(normalizedParams)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: error.message })
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' })
    }
    return
  }

  const routeWhere: RouteWhere = {
    AND: [
      { climbingStructureType: { in: normalizedParams.climbingStructureTypes } },
      { grade: { rating: { gte: normalizedParams.ratingFrom, lte: normalizedParams.ratingTo } } },
      { name: { contains: normalizedParams.routeName as string, mode: 'insensitive' } },
      { approvalState: { in: normalizedParams.routeApprovalStates } },
    ],
  }

  const where: ClimbingObjectWhere = {
    AND: [
      {
        AND: [
          { name: { contains: normalizedParams.name as string, mode: 'insensitive' } },
          { longitude: { gte: normalizedParams.longitudeFrom, lte: normalizedParams.longitudeTo } },
          { latitude: { gte: normalizedParams.latitudeFrom, lte: normalizedParams.latitudeTo } },
          {
            ...(normalizedParams.excludeWithoutMatchingRoutes && {
              routes: { some: routeWhere },
            }),
          },
          { approvalState: { in: normalizedParams.approvalStates } },
        ],
      },
      {
        deleted: false,
      },
    ],
  }

  const orderBy: ClimbingObjectOrder[] = getOrderBy(normalizedParams.sort, normalizedParams.order)
  orderBy.push({ id: 'asc' })

  const climbingObjectListResult = await ClimbingObjectRepository.list(
    where,
    routeWhere,
    orderBy,
    normalizedParams.page,
    normalizedParams.pageSize
  )
  res.status(HTTP_STATUS.OK_200).json(climbingObjectListResult)
}

const create = async (req: Request<ClimbingObjectCreate>, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const climbingObjectData: ClimbingObjectCreate = req.body

  const validatedData = requestValidator(
    () => climbingObjectCreateValidate(climbingObjectData),
    res
  )
  if (!validatedData) return

  const climbingObject = await ClimbingObjectRepository.create(validatedData, userRef)
  res.status(HTTP_STATUS.CREATED_201).json(climbingObject)
}

const update = async (
  req: Request<{ id: string }, object, ClimbingObjectUpdate>,
  res: Response
) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const climbingObjectData = req.body
  const climbingObjectId = req.params.id

  const validatedData = requestValidator(
    () => climbingObjectUpdateValidate(climbingObjectData),
    res
  )
  if (!validatedData) return

  const exists: boolean = await ClimbingObjectRepository.exists(climbingObjectId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Climbing object not found' })
    return
  }

  const climbingObject = await ClimbingObjectRepository.update(
    climbingObjectId,
    validatedData,
    userRef
  )
  res.status(HTTP_STATUS.OK_200).json(climbingObject)
}

const deleteById = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const climbingObjectId = req.params.id
  const exists: boolean = await ClimbingObjectRepository.exists(climbingObjectId)
  if (!exists) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Climbing object not found' })
    return
  }

  await ClimbingObjectRepository.deleteById(climbingObjectId, userRef)
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
  const climbingObjectId = req.params.id
  const climbingObject = await ClimbingObjectRepository.getById(climbingObjectId)

  if (climbingObject == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Climbing object not found' })
    return
  }

  const approvalState = req.query.approvalState as ApprovalState
  if (approvalState === 'PENDING' || climbingObject.approvalState != 'PENDING') {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Invalid state' })
    return
  }

  const updated = await ClimbingObjectRepository.changeApprovalState(
    climbingObjectId,
    approvalState,
    userRef
  )
  res.status(HTTP_STATUS.OK_200).json(updated)
  return
}

export default {
  getById,
  create,
  update,
  deleteById,
  list,
  changeApprovalState,
}
