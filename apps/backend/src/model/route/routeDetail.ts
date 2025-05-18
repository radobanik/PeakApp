import { ApprovalState, ClimbingStructureType } from '@prisma/client'
import { GradeDetail, gradeDetailSelector } from '../grade'
import { UserLabeled, userLabeledSelector } from '../user'
import { OverlayPoint } from './overlayPoint/overlayPoint'
import { ClimbingObjectNoRoutes, climbingObjectNoRoutesSelector } from '../climbingObject'
import { RefObject, refObjectSelector } from '../common/refObject'

type RouteDetail = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled
  updatedBy: UserLabeled | null

  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType

  longitude: number
  latitude: number

  image: RefObject | null
  additionalImages: RefObject[]
  overlay: OverlayPoint[]

  climbingObject: ClimbingObjectNoRoutes
  approvalState: ApprovalState
}

const selector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: userLabeledSelector,
  },
  updatedBy: {
    select: userLabeledSelector,
  },
  name: true,
  description: true,
  grade: {
    select: gradeDetailSelector,
  },
  climbingStructureType: true,
  longitude: true,
  latitude: true,
  image: true,
  additionalImages: {
    select: {
      peakFile: {
        select: refObjectSelector,
      },
    },
  },
  overlay: true,
  climbingObject: {
    select: climbingObjectNoRoutesSelector,
  },
  approvalState: true,
}

export type { RouteDetail }
export { selector }
