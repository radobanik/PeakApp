import { z } from 'zod'

type NotificationSettings = {
  id: string
  userId: string

  enableApp: boolean
  enableLikes: boolean
  enableComments: boolean
  enableEmail: boolean

  createdAt: Date
  updatedAt: Date | null
}

const notificationSettingsSelector = {
  id: true,
  userId: true,
  enableApp: true,
  enableLikes: true,
  enableComments: true,
  enableEmail: true,
  createdAt: true,
  updatedAt: true,
}

export type { NotificationSettings }
export { notificationSettingsSelector }
