import { ReportStatus } from '@prisma/client'
import { UserLabeled, userLabeledSelector } from '../user'
import { RouteDetail, routeDetailSelector } from '../route'
import { ClimbingObjectDetail, climbingObjectDetailSelector } from '../climbingObject'

type ReportDetail = {
  id: string
  createdAt: Date
  reportStatus: ReportStatus
  resolvedAt: Date | null

  createdBy: UserLabeled
  climbingObject: ClimbingObjectDetail | null
  route: RouteDetail | null

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
  climbingObject: { select: climbingObjectDetailSelector },
  route: { select: routeDetailSelector },

  title: true,
  reason: true,

  resolution: true,
}

export type { ReportDetail }
export { selector }
