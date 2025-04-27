import { ActivityDetail, activityDetailSelector } from '../activity'
import { UserLabeled, userLabeledSelector } from '../user'
import { RefObject, refObjectSelector } from '../common/refObject'

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
    select: activityDetailSelector,
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
