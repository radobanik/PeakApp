import { ApprovalState } from '@prisma/client'

type ClimbingObjectNoRoutes = {
  id: string
  name: string
  longitude: number
  latitude: number
  approvalState: ApprovalState
}

const selector = {
  id: true,
  name: true,
  longitude: true,
  latitude: true,
  approvalState: true,
}

export type { ClimbingObjectNoRoutes }
export { selector }
