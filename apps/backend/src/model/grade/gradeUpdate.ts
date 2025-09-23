import { z } from 'zod'

type GradeUpdate = {
  rating: number
  name: string
  color: string
}

const validate = (entity: GradeUpdate) =>
  z
    .object({
      rating: z
        .number()
        .int('Rating must be an integer')
        .nonnegative('Rating must be non-negative'),
      name: z.string().min(1, 'Name must not be empty'),
      color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be in the format #000000'),
    })
    .strict()
    .safeParse(entity)

export type { GradeUpdate }
export { validate }
