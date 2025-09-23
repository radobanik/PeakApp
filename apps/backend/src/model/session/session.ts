import { User } from '@prisma/client'
import { PeakFile, peakFileSelector } from '../peakFile'
import { ActivityDetail, activityDetailSelector } from '../activity'

type Session = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: User

  note: string

  assignedActivities: ActivityDetail[]
  photos: PeakFile[]
}

const selector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,

  note: true,

  assignedActivities: {
    select: activityDetailSelector,
  },
  photos: {
    select: peakFileSelector,
  },
}

export type { Session }
export { selector }
