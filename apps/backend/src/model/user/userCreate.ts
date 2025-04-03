import z from 'zod'

type UserCreate = {
  userName: string
  password: string
  email: string

  firstName: string
  lastName: string
}

const validate = (entity: UserCreate) =>
  z
    .object({
      firstName: z.string().min(1, 'First name must not be empty'),
      lastName: z.string().min(1, 'Last name must not be empty'),
      email: z.string().email('Invalid email address'),
      userName: z.string().min(1, 'User name must not be empty'),
      password: z.string().nonempty('Password is required'),
    })
    .strict()
    .safeParse(entity)

export type { UserCreate }
export { validate }
