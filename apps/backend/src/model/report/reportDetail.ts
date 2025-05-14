import { ReportStatus } from '@prisma/client'
import { UserLabeled, userLabeledSelector } from '../user'
import { RouteList, routeListSelector } from '../route'
import { ClimbingObjectList, climbingObjectNoRoutesSelector } from '../climbingObject'

type ReportDetail = {
  id: string
  createdAt: Date
  reportStatus: ReportStatus
  resolvedAt: Date | null

  createdBy: UserLabeled
  climbingObject: ClimbingObjectList | null
  route: RouteList | null

  title: string
  reason: string

  resolution: string | null
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
  reason: true,

  resolution: true,
}

export type { ReportDetail }
export { selector }
