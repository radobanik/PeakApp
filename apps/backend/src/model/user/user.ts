type User = {
  id: string
  userName: string
  password: string
  email: string
  description: string

  firstName: string
  lastName: string

  birthday: Date | null
  height: number | null
  weight: number | null

  notificationSettings: {
    disabled: boolean
    disableLikes: boolean
    disableComments: boolean
    emailNotifications: boolean
  }

  city: {
    id: string
    name: string
  } | null
  profilePictureId?: string | null
  profilePicture: {
    id: string
    name: string
    contentType: string
    identifier: string
  } | null
  createdAt: Date
  updatedAt: Date | null
  deleted: boolean
}

export type { User }
