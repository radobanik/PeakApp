import { z } from 'zod'

type ReportResolve = {
  resolution: string
}

const validate = (entity: ReportResolve) =>
  z
    .object({
      resolution: z
        .string()
        .min(1, 'Resolution must not be empty')
        .max(500, 'Resolution must not be longer than 500 characters'),
    })
    .strict()
    .safeParse(entity)

export type { ReportResolve }
export { validate }
