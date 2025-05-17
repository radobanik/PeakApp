import { Role } from '@prisma/client'

type UserDetail = {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  description: string
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
  notificationSettings: {
    enableApp: boolean
    enableLikes: boolean
    enableComments: boolean
    enableEmail: boolean
  } | null
  profilePictureId: string | null
  createdAt: Date
  updatedAt: Date | null
}

const selector = {
  id: true,
  userName: true,
  email: true,
  description: true,

  firstName: true,
  lastName: true,

  roles: true,

  birthday: true,
  height: true,
  weight: true,

  notificationSettings: {
    select: {
      enableApp: true,
      enableLikes: true,
      enableComments: true,
      enableEmail: true,
    },
  },

  cityId: true,

  createdAt: true,
  updatedAt: true,

  profilePictureId: true,
}

export type { UserDetail }
export { selector }
