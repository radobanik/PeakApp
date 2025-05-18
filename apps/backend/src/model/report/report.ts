import { ReportStatus } from '@prisma/client'
import { User } from '../user'
import { Route } from '../route'
import { ClimbingObject } from '../climbingObject'

type Report = {
  id: string
  createdAt: Date
  reportStatus: ReportStatus
  resolvedAt: Date | null

  createdBy: User
  climbingObject: ClimbingObject | null
  route: Route | null

  title: string
  reason: string

  resolution: string | null
}

export type { Report }
