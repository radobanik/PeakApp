import { API } from '@/constants/api'
import { api } from './index'
import { NotificationListItem } from '@/types/notificationTypes'

export async function getAndReadAllNotifications(): Promise<NotificationListItem[]> {
  try {
    const response = await api.get(`${API.NOTIFICATIONS.LIST_AS_READ()}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const response = await api.get(`${API.NOTIFICATIONS.UNREAD_COUNT()}`)
    return response.data.unreadCount
  } catch (error) {
    throw error
  }
}
