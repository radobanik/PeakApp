import { NotificationType } from '@prisma/client'

type NotificationSettings = {
  id: string
  userId: string

  enableApp: boolean
  enableEmail: boolean
  allowedTypes: NotificationType[]

  createdAt: Date
  updatedAt: Date | null
}

const notificationSettingsSelector = {
  id: true,
  userId: true,
  enableApp: true,
  enableEmail: true,
  allowedTypes: true,
  createdAt: true,
  updatedAt: true,
}

export type { NotificationSettings }
export { notificationSettingsSelector }
