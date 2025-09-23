import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type SessionUpdate = {
  name: string
  note: string
  photos: RefObject[]
}

const validate = (entity: SessionUpdate) =>
  z
    .object({
      name: z.string().max(100, 'Name must be at most 100 characters long.'),
      note: z.string().max(500, 'Note must be at most 500 characters long.'),
      photos: z.array(refObjectSchema),
    })
    .strict()
    .safeParse(entity)

export type { SessionUpdate }
export { validate }
