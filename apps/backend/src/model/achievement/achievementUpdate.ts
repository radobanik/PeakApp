import { RefObject, refObjectSchema } from '../common/refObject'
import { AchievementType } from '@prisma/client'
import { z } from 'zod'

type AchievementUpdate = {
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

const validate = (entity: AchievementUpdate) => {
  return z
    .object({
      name: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      minimumValue: z.number(),
      type: z.nativeEnum(AchievementType),
      icon: refObjectSchema.nullable(),
    })
    .strict()
    .safeParse(entity)
}

export type { AchievementUpdate }
export { validate }
