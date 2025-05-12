import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type SessionCreate = {
  name: string
  note: string
  assignedActivities: RefObject[]
  photos: RefObject[]
}

const validate = (entity: SessionCreate) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required.')
        .max(100, 'Name must be at most 100 characters long.'),
      note: z.string().max(500, 'Note must be at most 500 characters long.'),
      assignedActivities: z.array(refObjectSchema),
      photos: z.array(refObjectSchema),
    })
    .strict()
    .safeParse(entity)

export type { SessionCreate }
export { validate }
