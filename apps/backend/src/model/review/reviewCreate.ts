import { z } from 'zod'
import { GradeController } from '../../controllers'
import { GradeRepository } from '../../repositories'
import { RefObject, refObjectSchema } from '../common/refObject'

type ReviewCreate = {
  stars: number
  text: string
  gradeRating: RefObject
}

const validate = (entity: ReviewCreate) =>
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

export type { ReviewCreate }
export { validate }
