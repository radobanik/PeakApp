import { Difficulty } from '@prisma/client'
import z from 'zod'
import { RefObject } from '../common/refObject'

type ActivityCreate = {
  climbedAt: Date
  reviewStars: number
  reviewText: string
  numOfAttempts: number
  perceivedDifficulty: Difficulty
  notes: string
  topped: boolean

  route: RefObject
}

const validate = (entity: ActivityCreate) =>
  z
    .object({
      climbedAt: z.coerce.date().max(new Date(), 'Cannot create Activity in the future.'),
      reviewStars: z
        .number()
        .min(0, 'Stars must be between 0 and 5.')
        .max(5, 'Stars must be between 0 and 5.'),
      reviewText: z.string().max(500, 'Review text must be at most 500 characters long.'),
      numOfAttempts: z.number().min(0, 'Number of attempts must be at least 0.'),
      perceivedDifficulty: z.nativeEnum(Difficulty, {
        errorMap: () => ({ message: 'Invalid perceived difficulty.' }),
      }),
      notes: z.string().max(500, 'Notes must be at most 500 characters long.'),
      topped: z.boolean(),
      route: z
        .object({
          id: z.string(),
        })
        .strict(),
    })
    .strict()
    .safeParse(entity)

export type { ActivityCreate }
export { validate }
