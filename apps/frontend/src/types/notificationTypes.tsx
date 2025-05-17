import { Pagination } from './paginationTypes'
import type { UserLabeled } from './userTypes'

export type Notification = {
  id: string
  user: UserLabeled
  title: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string | null
}

export type NotificationListItem = {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string | null
}

export type NotificationSettings = {
  enableApp: boolean
  enableLikes: boolean
  enableComments: boolean
  enableEmail: boolean
}

export type NotificationSettingsUpdateRequest = {
  enableApp?: boolean
  enableLikes?: boolean
  enableComments?: boolean
  enableEmail?: boolean
}

export type NotificationResponse = Notification
export type NotificationSettingsResponse = NotificationSettings
export interface NotificationListResponse extends Pagination {
  items: NotificationListItem[]
}
