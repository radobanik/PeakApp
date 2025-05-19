import { AchievementType } from '@prisma/client'
import { RefObject, refObjectSelector } from '../common/refObject'

type AchievementDetail = {
  id: string
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

const selector = {
  id: true,
  name: true,
  description: true,
  minimumValue: true,
  type: true,
  icon: {
    select: refObjectSelector,
  },
}

export type { AchievementDetail }
export { selector }
