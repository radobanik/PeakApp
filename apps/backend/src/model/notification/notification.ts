import { NotificationType } from '@prisma/client'
import { UserLabeled, userLabeledSelector } from '../user'

type Notification = {
  id: string

  user: UserLabeled
  type: NotificationType

  title: string
  message: string
  isRead: boolean

  createdAt: Date
  updatedAt: Date | null
}

const notificationSelector = {
  id: true,
  createdAt: true,
  updatedAt: true,
  type: true,
  user: {
    select: userLabeledSelector,
  },
  title: true,
  message: true,
  isRead: true,
}

export type { Notification }
export { notificationSelector }
