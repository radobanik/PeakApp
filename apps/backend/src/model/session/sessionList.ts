import { Difficulty } from '@prisma/client'
import { RouteList } from '../route'
import { UserLabeled, userLabeledSelector } from '../user'
import { RefObject } from '../common/refObject'
import { activityListSelector } from '../activity'
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
  createdBy: UserLabeled

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
    select: userLabeledSelector,
  },

  name: true,
  note: true,

  assignedActivities: {
    select: activityListSelector,
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
