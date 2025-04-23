import { UserLabeled } from './authTypes'

export interface PeakFile {
  id: string
  createdAt: Date
  name: string
  contentType: string
  url: string
  createdBy: UserLabeled
}
