import { NotificationType } from "@prisma/client"

type NotificationList = {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: Date
}

const notificationListSelector = {
  id: true,
  title: true,
  message: true,
  type: true,
  isRead: true,
  createdAt: true,
}

export type { NotificationList }
export { notificationListSelector }
