import { z } from 'zod'

type NotificationSettings = {
  id: string
  userId: string

  disabled: boolean
  disableLikes: boolean
  disableComments: boolean
  emailNotifications: boolean

  createdAt: Date
  updatedAt: Date | null
}

const notificationSettingsSelector = {
  id: true,
  userId: true,
  disabled: true,
  disableLikes: true,
  disableComments: true,
  emailNotifications: true,
  createdAt: true,
  updatedAt: true,
}

export type { NotificationSettings }
export { notificationSettingsSelector }
