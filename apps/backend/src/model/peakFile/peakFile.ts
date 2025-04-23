import { UserLabeled, userLabeledSelector } from '../user'
import { PeakFileCreate } from './peakFileCreate'

type PeakFile = {
  id: string
  createdAt: Date
  name: string
  contentType: string
  createdBy: UserLabeled
  externalId: string
}

const selector = {
  id: true,
  createdAt: true,
  name: true,
  contentType: true,
  externalId: true,
  createdBy: {
    select: userLabeledSelector,
  },
}

export type { PeakFile, PeakFileCreate }
export { selector }
