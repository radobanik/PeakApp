import { AchievementType } from '@prisma/client'
import { RefObject, refObjectSchema } from '../common/refObject'
import { z } from 'zod'

type AchievementCreate = {
  name: string
  description: string
  minimumValue: number
  type: AchievementType
  icon: RefObject | null
}

const validate = (entity: AchievementCreate) => {
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

export type { AchievementCreate }
export { validate }
