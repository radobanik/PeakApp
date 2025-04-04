import { Role } from '@prisma/client'

type UserDetail = {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  roles: Role[]
  birthday: Date | null
  height: number | null
  weight: number | null
  cityId: string | null
  city: {
    id: string
    name: string
    country: {
      id: string
      name: string
      code: string
    }
  } | null
  createdAt: Date
  updatedAt: Date | null
}

const selector = {
  id: true,
  userName: true,
  email: true,

  firstName: true,
  lastName: true,

  roles: true,

  birthday: true,
  height: true,
  weight: true,

  cityId: true,

  createdAt: true,
  updatedAt: true,
}

export type { UserDetail }
export { selector }
