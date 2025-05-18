import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type ReportCreate = {
  title: string
  reason: string
  route: RefObject | null
  climbingObject: RefObject | null
}

const validate = (entity: ReportCreate) =>
  z
    .object({
      title: z
        .string()
        .min(1, 'Title must not be empty')
        .max(50, 'Title must not be longer than 20 characters'),
      reason: z
        .string()
        .min(1, 'Reason must not be empty')
        .max(500, 'Reason must not be longer than 500 characters'),
      route: refObjectSchema.nullable(),
      climbingObject: refObjectSchema.nullable(),
    })
    .strict()
    .refine(
      (data) =>
        (data.route !== null && data.climbingObject === null) ||
        (data.route === null && data.climbingObject !== null),
      {
        message: 'You must provide either a route or a climbing object, not both or neither.',
        path: [],
      }
    )
    .safeParse(entity)

export type { ReportCreate }
export { validate }
