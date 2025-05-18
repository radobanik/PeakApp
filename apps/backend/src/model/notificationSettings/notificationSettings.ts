import { allow } from 'joi'
import { z } from 'zod'

type NotificationSettings = {
  id: string
  userId: string

  enableApp: boolean
  enableEmail: boolean
  allowedTypes: string[]

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
