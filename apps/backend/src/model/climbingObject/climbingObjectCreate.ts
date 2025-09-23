import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type ClimbingObjectCreate = {
  name: string
  longitude: number
  latitude: number
  image: RefObject | null
}

const validate = (entity: ClimbingObjectCreate) =>
  z
    .object({
      name: z.string().min(1, 'Name must not be empty'),
      longitude: z
        .number()
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180'),
      latitude: z
        .number()
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90'),
      image: refObjectSchema.nullable(),
    })
    .strict()
    .safeParse(entity)

export type { ClimbingObjectCreate }
export { validate }
