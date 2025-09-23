import { UserLabeled } from './authTypes'

export interface PeakFile {
  id: string
  createdAt: Date
  name: string
  contentType: string
  url: string
  createdBy: UserLabeled
}

export type PeakFileCreate = {
  name: string
  contentType: string
  source: PeakFileSource
  identifier: string
}

export type PeakFileSource = 'S3_BUCKET' | 'GENERIC_URL'
