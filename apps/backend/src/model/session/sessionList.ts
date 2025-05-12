import { Difficulty } from '@prisma/client'
import { RouteList, routeListSelector } from '../route'
import { UserLabeled, userLabeledSelector } from '../user'

type ActivityList = {
  id: string

  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: Difficulty
  notes: string
  topped: boolean

  route: RouteList
}

type SessionList = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled

  name: string
  note: string

  assignedActivities: ActivityList[]
}

const selector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: userLabeledSelector,
  },

  name: true,
  note: true,

  assignedActivities: {
    select: {
      id: true,

      climbedAt: true,
      numOfAttempts: true,
      perceivedDifficulty: true,
      notes: true,
      topped: true,

      route: {
        select: routeListSelector,
      },
    },
  },
}

export type { SessionList }
export { selector }
