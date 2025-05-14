import { Request, Response } from 'express'
import { provideUserRefFromToken, returnUnauthorized } from '../auth/authUtils'
import { ClimbingObjectRepository, ReportRepository, RouteRepository } from '../repositories'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import {
  defaultReportListParams,
  getOrderBy,
  IncommingReportListParams,
  ReportCreate,
  reportCreateValidate,
  ReportResolve,
  reportResolveValidate,
  validateReportListParams,
} from '../model/report'
import { ReportOrder, ReportWhere } from '../repositories/report.repository'
import requestValidator from '../model/common/validator'
import { ReportStatus } from '@prisma/client'

const getById = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req as unknown as Request)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const reportId = req.params.id
  const report = await ReportRepository.getById(reportId)

  if (report == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Report not found' })
  } else {
    res.status(HTTP_STATUS.OK_200).json(report)
  }
}

const getPendingFromUser = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const { routeId, climbingObjectId } = req.query

  if ((!routeId && !climbingObjectId) || (routeId && climbingObjectId)) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({
      error: 'Either routeId or climbingObjectId must be provided',
    })
    return
  }

  const pendingReport = await ReportRepository.getPendingFromUser(
    userRef,
    climbingObjectId ? { id: climbingObjectId as string } : null,
    routeId ? { id: routeId as string } : null
  )
  // Originally, this was returning 404 if the report was not found
  // but it seems more appropriate to return an empty response with 200 OK
  // to indicate that the user has no pending reports
  res.status(HTTP_STATUS.OK_200).json(pendingReport)
}

const list = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  let params
  try {
    params = defaultReportListParams(req.query as unknown as IncommingReportListParams)
    validateReportListParams(params)
  } catch (error: unknown) {
    res
      .status(HTTP_STATUS.BAD_REQUEST_400)
      .json({ error: `Invalid query parameters: ${(error as Error).message}` })
    return
  }

  const where: ReportWhere = {
    reportStatus: {
      in: params.reportStatuses,
    },
  }

  const orderBy: ReportOrder[] = getOrderBy(params.sort, params.order)

  const reportListResult = await ReportRepository.list(where, orderBy, params.page, params.pageSize)
  res.status(HTTP_STATUS.OK_200).json(reportListResult)
}

const create = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const data: ReportCreate = req.body
  const validatedData = requestValidator(() => reportCreateValidate(data), res)
  if (!validatedData) return

  const existsEntity = data.climbingObject
    ? await ClimbingObjectRepository.exists(data.climbingObject.id)
    : await RouteRepository.exists(data.route!.id)

  if (!existsEntity) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({
      error: `${data.climbingObject ? 'Climbing object' : 'Route'} not found`,
    })
    return
  }

  const pending = await ReportRepository.getPendingFromUser(
    userRef,
    data.climbingObject,
    data.route
  )
  if (pending != null) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({
      error:
        'You already have a pending report for this' + (data.route ? ' route' : ' climbing object'),
    })
    return
  }

  const report = await ReportRepository.create(userRef, data)
  res.status(HTTP_STATUS.CREATED_201).json(report)
}

const resolve = async (req: Request, res: Response) => {
  const userRef = provideUserRefFromToken(req)
  if (userRef === null) {
    returnUnauthorized(res)
    return
  }

  const reportId = req.params.id
  const report = await ReportRepository.getById(reportId)
  if (report == null) {
    res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: 'Report not found' })
    return
  }
  if (report.reportStatus !== ReportStatus.PENDING) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({ error: 'Report is already resolved' })
    return
  }

  const data: ReportResolve = req.body
  const validatedData = requestValidator(() => reportResolveValidate(data), res)
  if (!validatedData) return

  const resolution = req.body.resolution
  const resolvedReport = await ReportRepository.resolve(reportId, resolution)
  res.status(HTTP_STATUS.OK_200).json(resolvedReport)
}

export default {
  getById,
  getPendingFromUser,
  list,
  create,
  resolve,
}
