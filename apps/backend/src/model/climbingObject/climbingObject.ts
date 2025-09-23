import { ApprovalState, User } from '@prisma/client'
import { Route } from '../route'
import { PeakFile } from '../peakFile'

type ClimbingObject = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: User
  updatedBy: User | null
  deleted: boolean

  name: string
  longitude: number
  latitude: number

  routes: Route[]
  approvalState: ApprovalState
  image: PeakFile | null
}

export type { ClimbingObject }
