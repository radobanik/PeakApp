import { ApprovalState } from '@prisma/client'
import { RouteList, routeListSelector } from '../route'
import { UserLabeled, userLabeledSelector } from '../user'
import { RefObject } from '../common/refObject'

type ClimbingObjectDetail = {
  id: string

  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled
  updatedBy: UserLabeled | null

  name: string
  longitude: number
  latitude: number

  routes: RouteList[]
  approvalState: ApprovalState

  image: RefObject | null
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
  longitude: true,
  latitude: true,

  routes: {
    select: routeListSelector,
  },
  approvalState: true,
  image: {
    select: {
      id: true,
    },
  },
}

export type { ClimbingObjectDetail }
export { selector }
