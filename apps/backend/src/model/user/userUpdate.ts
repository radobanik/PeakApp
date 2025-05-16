import { z } from 'zod'

type UserUpdate = {
  firstName: string
  lastName: string

  userName: string
  description: string

  birthday: Date | null
  height: number | null
  weight: number | null

  cityId?: string | null
  profilePictureId: string | null
}

const validate = (entity: UserUpdate) =>
  z
    .object({
      firstName: z.string().min(1, 'First name must not be empty'),
      lastName: z.string().min(1, 'Last name must not be empty'),
      userName: z.string().min(1, 'Username must not be empty'),
      description: z.string().min(1, 'Description must not be empty'),
      birthday: z.coerce.date().nullable(),
      height: z.number().positive().nullable(),
      weight: z.number().positive().nullable(),
      cityId: z.string().nullable(),
      profilePictureId: z.string().nullable(),
    })
    .strict()
    .safeParse(entity)

export type { UserUpdate }
export { validate }
