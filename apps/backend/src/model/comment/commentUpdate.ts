import { z } from 'zod'

type CommentUpdate = {
  text: string
}

const validate = (entity: CommentUpdate) =>
  z
    .object({
      id: z.string().uuid('Invalid comment ID.'),
      text: z
        .string()
        .min(1, 'Comment text must be at least 1 character long.')
        .max(500, 'Comment text must be at most 500 characters long.'),
    })
    .strict()
    .safeParse(entity)

export type { CommentUpdate }
export { validate }
