export type UserLabeled = {
  id: string
  userName: string

  firstName: string
  lastName: string
}

export type UserDetail = {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  description: string
  roles: string[]
  birthday: string | null
  height: number | null
  weight: number | null
  cityId: string | null
  createdAt: string
  updatedAt: string | null
  profilePictureId: string | null
  profilePicture: {
    id: string
    name: string
    contentType: string
    identifier: string
  } | null
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
  }
}

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

export type UserDetailResponse = UserDetail
export type UserUpdateRequest = UserUpdate

export type UserList = {
  id: string
  userName: string
  email: string

  firstName: string
  lastName: string

  profilePictureId: string | null
}

export type IsAdminReponse = { isAdmin: boolean }
