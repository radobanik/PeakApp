import { ReportStatus } from '@prisma/client'
import { User, userLabeledSelector } from '../user'
import { RouteList, routeListSelector } from '../route'
import { ClimbingObjectList, climbingObjectNoRoutesSelector } from '../climbingObject'
import {
  IncommingListParams,
  NonNullListParams,
  parseArray,
  toNotNullListParams,
  validateListParams,
} from '../common/listParams'
import config from '../../core/config'
import { ReportOrder } from '../../repositories/report.repository'

type ReportList = {
  id: string
  createdAt: Date
  reportStatus: ReportStatus
  resolvedAt: Date | null

  createdBy: User
  climbingObject: ClimbingObjectList | null
  route: RouteList | null

  title: string
}

const selector = {
  id: true,
  createdAt: true,
  reportStatus: true,
  resolvedAt: true,
  createdBy: { select: userLabeledSelector },
  climbingObject: { select: climbingObjectNoRoutesSelector },
  route: { select: routeListSelector },
  title: true,
}

type IncommingReportListParams = { reportStatuses: string } & IncommingListParams
type NonNullReportListParams = { reportStatuses: ReportStatus[] } & NonNullListParams

const validSortFields = ['createdAt']

const validateReportListParams = (params: NonNullReportListParams) => {
  validateListParams(params, validSortFields)
}

const parseReportStatuses = (reportStatuses: string | null) => {
  const types = parseArray(reportStatuses).map((value) => {
    if (Object.values(ReportStatus).includes(value as ReportStatus)) {
      return value as ReportStatus
    } else {
      throw new Error(`Invalid approval state: ${value}`)
    }
  })

  // all types if none are provided
  return types.length > 0 ? types : Object.values(ReportStatus)
}

const defaultReportListParams = (params: IncommingReportListParams): NonNullReportListParams => {
  const { reportStatuses, ...listParams } = params
  return {
    reportStatuses: parseReportStatuses(reportStatuses),
    ...toNotNullListParams(listParams, config.LIST_LIMIT.DEFAULT),
  }
}

const getOrderBy = (sortFields: string[], orderDirections: string[]): ReportOrder[] => {
  return sortFields.map((field, index) => {
    const direction = orderDirections[index]?.toLowerCase() === 'desc' ? 'desc' : 'asc'

    switch (field) {
      case 'createdAt':
        return { createdAt: direction }
      default:
        return { [field]: direction }
    }
  })
}

export type { ReportList, IncommingReportListParams, NonNullReportListParams }
export { selector, defaultReportListParams, validateReportListParams, getOrderBy }
