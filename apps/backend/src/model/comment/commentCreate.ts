import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type CommentCreate = {
  session: RefObject
  text: string
}

const validate = (entity: CommentCreate) =>
  z
    .object({
      session: refObjectSchema,
      text: z
        .string()
        .min(1, 'Comment text must be at least 1 character long.')
        .max(500, 'Comment text must be at most 500 characters long.'),
    })
    .strict()
    .safeParse(entity)

export type { CommentCreate }
export { validate }
