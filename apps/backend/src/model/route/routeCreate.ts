import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'
import { OverlayPoint, overlayPointSchema } from './overlayPoint/overlayPoint'
import { ClimbingStructureType } from '@prisma/client'

type RouteCreate = {
  name: string
  description: string
  grade: RefObject
  climbingStructureType: ClimbingStructureType

  longitude: number
  latitude: number

  image: RefObject | null
  additionalImages: RefObject[]
  overlay: OverlayPoint[]

  climbingObject: RefObject
}

const validate = (entity: RouteCreate) =>
  z
    .object({
      name: z.string().min(1, 'Name must not be empty'),
      description: z.string().min(1, 'Description must not be empty'),
      grade: refObjectSchema,
      climbingStructureType: z.nativeEnum(ClimbingStructureType),
      longitude: z
        .number()
        .min(-180, 'Longitude must be between -180 and 180')
        .max(180, 'Longitude must be between -180 and 180'),
      latitude: z
        .number()
        .min(-90, 'Latitude must be between -90 and 90')
        .max(90, 'Latitude must be between -90 and 90'),
      image: refObjectSchema.nullable(),
      additionalImages: z.array(refObjectSchema),
      overlay: overlayPointSchema.array(),
      climbingObject: refObjectSchema,
    })
    .strict()
    .safeParse(entity)

export type { RouteCreate }
export { validate }
