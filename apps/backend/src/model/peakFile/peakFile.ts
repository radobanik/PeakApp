import { PeakFileSource } from '@prisma/client'
import { UserLabeled, userLabeledSelector } from '../user'
import { PeakFileCreate } from './peakFileCreate'

type PeakFile = {
  id: string
  createdAt: Date
  name: string
  contentType: string
  createdBy: UserLabeled
  source: PeakFileSource
  /**
   * arbitrary string used to identify the file within the source system
   * e.g. S3_BUCKET - name file, GENERIC_URL - internet url
   */
  identifier: string
}

const selector = {
  id: true,
  createdAt: true,
  name: true,
  contentType: true,
  source: true,
  identifier: true,
  createdBy: {
    select: userLabeledSelector,
  },
}

export type { PeakFile, PeakFileCreate }
export { selector }
