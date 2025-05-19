import { ApprovalState, ClimbingStructureType } from '@prisma/client'
import { Grade } from '../grade'
import { PeakFile } from '../peakFile'
import { User } from '../user'
import { OverlayPoint } from './overlayPoint/overlayPoint'
import { ClimbingObject } from '../climbingObject'

type Route = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  deleted: boolean
  createdBy: User
  updatedBy: User | null

  name: string
  description: string
  grade: Grade
  climbingStructureType: ClimbingStructureType
  rating: number

  longitude: number
  latitude: number

  image: PeakFile | null
  additionalImages: PeakFile[]
  overlay: OverlayPoint[]

  climbingObject: ClimbingObject

  approvalState: ApprovalState
}

export type { Route }
