import { UserLabeled } from '../user'
import { PeakFile } from './peakFile'

type PeakFileDetail = {
  id: string
  createdAt: Date
  name: string
  contentType: string
  createdBy: UserLabeled
  url: string
}

const toPeakFileDetail = (data: PeakFile, url: string): PeakFileDetail => ({
  id: data.id,
  createdAt: data.createdAt,
  name: data.name,
  contentType: data.contentType,
  createdBy: data.createdBy,
  url,
})

export type { PeakFileDetail }
export { toPeakFileDetail }
