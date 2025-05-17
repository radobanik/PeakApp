import { API } from '@/constants/api'
import { api } from './index'
import {
  NotificationListResponse,
  NotificationSettings,
  NotificationSettingsUpdateRequest,
} from '@/types/notificationTypes'

export async function getAndReadAllNotifications(
  page: number = 1,
  pageSize: number = 10
): Promise<NotificationListResponse> {
  try {
    const response = await api.get(API.NOTIFICATIONS.LIST_AS_READ(), {
      params: { page, pageSize },
    })
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

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const response = await api.get(API.NOTIFICATIONS.SETTINGS())
    console.log('SERVICE SETTINGS:', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateNotificationSettings(
  settings: NotificationSettingsUpdateRequest
): Promise<NotificationSettings> {
  try {
    console.log('sending  SETTINGS:', settings)
    const response = await api.put(API.NOTIFICATIONS.SETTINGS(), settings)
    return response.data
  } catch (error) {
    throw error
  }
}
