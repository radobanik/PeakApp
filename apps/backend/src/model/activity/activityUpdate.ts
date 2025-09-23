import { Difficulty } from '@prisma/client'
import z from 'zod'

type ActivityUpdate = {
  climbedAt: Date
  numOfAttempts: number
  perceivedDifficulty: Difficulty
  notes: string
  topped: boolean
}

const validate = (entity: ActivityUpdate) =>
  z
    .object({
      climbedAt: z.coerce.date().max(new Date(), 'Cannot create Activity in the future.'),
      numOfAttempts: z.number().min(0, 'Number of attempts must be at least 0.'),
      perceivedDifficulty: z.nativeEnum(Difficulty, {
        errorMap: () => ({ message: 'Invalid perceived difficulty.' }),
      }),
      notes: z.string().max(500, 'Notes must be at most 500 characters long.'),
      topped: z.boolean(),
    })
    .strict()
    .safeParse(entity)

export type { ActivityUpdate }
export { validate }
