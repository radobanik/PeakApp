import { Pagination } from './paginationTypes'
import type { UserLabeled } from './userTypes'

export enum NotificationType {
  LIKES = 'LIKE',
  COMMENTS = 'COMMENT',
}

export type Notification = {
  id: string
  user: UserLabeled
  type: NotificationType
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
  type: NotificationType
  isRead: boolean
  createdAt: string
  updatedAt: string | null
}

export type NotificationSettings = {
  enableApp: boolean
  enableEmail: boolean
  allowedTypes: NotificationType[]
}

export type NotificationSettingsUpdateRequest = {
  enableApp?: boolean
  allowedTypes?: NotificationType[]
  enableEmail?: boolean
}

export type NotificationResponse = Notification
export type NotificationSettingsResponse = NotificationSettings
export interface NotificationListResponse extends Pagination {
  items: NotificationListItem[]
}
