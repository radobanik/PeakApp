import { z } from 'zod'

type ReviewCreate = {
  stars: number
  text: string

  routeId: string
}

const validate = (entity: ReviewCreate) =>
  z
    .object({
      stars: z
        .number()
        .min(0, 'Stars must be between 0 and 5.')
        .max(5, 'Stars must be between 0 and 5.'),
      text: z.string().max(500, 'Review text must be at most 500 characters long.'),
      routeId: z.string().uuid('Invalid route ID.'),
    })
    .strict()
    .safeParse(entity)

export type { ReviewCreate }
export { validate }
