import { ActivityDetail } from '../activity'
import { UserLabeled, userLabeledSelector } from '../user'
import { RefObject, refObjectSelector } from '../common/refObject'
import { routeListSelector } from '../route'

type SessionDetail = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: UserLabeled

  name: string
  note: string

  assignedActivities: ActivityDetail[]
  photos: RefObject[]
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
      createdAt: true,
      updatedAt: true,
      createdBy: {
        select: userLabeledSelector,
      },
      climbedAt: true,
      reviewStars: true,
      reviewText: true,
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
        select: refObjectSelector,
      },
    },
  },
}

export type { SessionDetail }
export { selector }
