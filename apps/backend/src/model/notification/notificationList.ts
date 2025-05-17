type NotificationList = {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

const notificationListSelector = {
  id: true,
  title: true,
  message: true,
  isRead: true,
  createdAt: true,
}

export type { NotificationList }
export { notificationListSelector }
