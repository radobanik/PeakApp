import { z } from 'zod'
import { GradeController } from '../../controllers'
import { GradeRepository } from '../../repositories'

type ReviewCreate = {
  stars: number
  text: string
  gradeRating: number
}

const validate = (entity: ReviewCreate) =>
  z
    .object({
      stars: z
        .number()
        .min(0, 'Stars must be between 0 and 5.')
        .max(5, 'Stars must be between 0 and 5.'),
      text: z.string().max(500, 'Review text must be at most 500 characters long.'),
      gradeRating: z
        .number()
        .min(0, 'Grade rating must be greater than 0.')
        .max(1000, 'Grade rating must be smaller than 1000.'),
    })
    .strict()
    .safeParse(entity)

export type { ReviewCreate }
export { validate }
