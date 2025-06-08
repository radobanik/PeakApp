import { z } from 'zod'
import { GradeController } from '../../controllers'
import { GradeRepository } from '../../repositories'

type ReviewCreate = {
  stars: number
  text: string
  gradeRating: number
}

const validate = async (entity: ReviewCreate) => {
  const grades = await GradeRepository.getAll().then((grades) =>
    grades.map((grade) => grade.rating)
  )
  const minGrade = Math.min(...grades)
  const maxGrade = Math.max(...grades)

  return z
    .object({
      stars: z
        .number()
        .min(0, 'Stars must be between 0 and 5.')
        .max(5, 'Stars must be between 0 and 5.'),
      text: z.string().max(500, 'Review text must be at most 500 characters long.'),
      gradeRating: z
        .number()
        .min(minGrade, 'Grade rating must be in range of existing grades.')
        .max(maxGrade, 'Grade rating must be in range of existing grades.'),
    })
    .strict()
    .safeParse(entity)
}

export type { ReviewCreate }
export { validate }
