import { UserLabeled } from './authTypes'

export interface PeakFile {
  id: string
  createdAt: Date
  name: string
  contentType: string
  path: string
  createdBy: UserLabeled
}
