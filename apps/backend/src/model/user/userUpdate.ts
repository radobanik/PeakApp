import { z } from 'zod'

type UserUpdate = {
  firstName: string
  lastName: string

  birthday: Date | null
  height: number | null
  weight: number | null

  city: string | null
  state: string | null
  countryCode: string | null

  cityId?: string | null
}

const validate = (entity: UserUpdate) =>
  z
    .object({
      firstName: z.string().min(1, 'First name must not be empty'),
      lastName: z.string().min(1, 'Last name must not be empty'),
      birthday: z.coerce.date().nullable(),
      height: z.number().positive().nullable(),
      weight: z.number().positive().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      countryCode: z.string().length(2, 'Country code must be exactly 2 characters').nullable(),
      cityId: z.string().nullable(),
    })
    .strict()
    .safeParse(entity)

export type { UserUpdate }
export { validate }
