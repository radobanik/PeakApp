import { Difficulty } from '@prisma/client'
import { RouteList, routeListSelector } from '../route'
import { UserList, userListSelector } from '../user'
import { RefObject } from '../common/refObject'
import { peakFileSelector } from '../peakFile'

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
  createdBy: UserList

  name: string
  note: string

  assignedActivities: ActivityList[]
  photo: RefObject | null
}

const selector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: userListSelector,
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

  photos: {
    select: {
      peakFile: {
        select: peakFileSelector,
      },
    },
  },
}

export type { SessionList }
export { selector }
