import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type ReviewUpdate = {
  stars: number
  text: string
  gradeRating: RefObject
}

const validate = (entity: ReviewUpdate) =>
  z
    .object({
      stars: z
        .number()
        .min(0, 'Stars must be between 0 and 5.')
        .max(5, 'Stars must be between 0 and 5.'),
      text: z.string().max(500, 'Review text must be at most 500 characters long.'),
      gradeRating: refObjectSchema,
    })
    .strict()
    .safeParse(entity)

export type { ReviewUpdate }
export { validate }
