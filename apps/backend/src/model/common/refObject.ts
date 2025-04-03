import { z } from 'zod'

type RefObject = {
  id: string
}

const refObjectSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict()

const refObjectSelector = {
  id: true,
}

export type { RefObject }
export { refObjectSchema, refObjectSelector }
