import { UserLabeled, userLabeledSelector } from '../user'
import { PeakFileCreate } from './peakFileCreate'

type PeakFile = {
  id: string
  createdAt: Date
  name: string
  contentType: string
  path: string
  createdBy: UserLabeled
}

const selector = {
  id: true,
  createdAt: true,
  name: true,
  contentType: true,
  path: true,
  createdBy: {
    select: userLabeledSelector,
  },
}

export type { PeakFile, PeakFileCreate }
export { selector }
