import { PrismaClient } from '@prisma/client'
import {
  Notification,
  NotificationCreate,
  NotificationUpdate,
  NotificationList,
  notificationListSelector,
  notificationSelector,
} from '../model/notification'
import { createListResponse, ListResponse } from '../model/common/listResponse'
import NotificationSettingsRepository from '../repositories/notificationSettings.repository'

const notificationClient = new PrismaClient().notification

const listByUser = async (userId: string): Promise<NotificationList[]> => {
  const settings = await NotificationSettingsRepository.getByUserId(userId)

  if (!settings || !settings.allowedTypes || !settings.enableApp) return []

  return await notificationClient.findMany({
    where: {
      userId,
      type: { in: settings?.allowedTypes },
    },
    orderBy: { createdAt: 'desc' },
    select: notificationListSelector,
  })
}

const getById = async (id: string): Promise<Notification | null> => {
  return await notificationClient.findUnique({
    where: { id },
    select: notificationSelector,
  })
}

const create = async (data: NotificationCreate): Promise<Notification> => {
  return await notificationClient.create({
    data,
    select: notificationSelector,
  })
}

const update = async (id: string, data: NotificationUpdate): Promise<Notification> => {
  return await notificationClient.update({
    where: { id },
    data,
    select: notificationSelector,
  })
}

const deleteById = async (id: string): Promise<void> => {
  await notificationClient.delete({
    where: { id },
  })
}

const markAsRead = async (id: string): Promise<Notification> => {
  return await notificationClient.update({
    where: { id },
    data: { isRead: true },
    select: notificationSelector,
  })
}

const listAndMarkAllAsRead = async (
  userId: string,
  page: number,
  pageSize: number
): Promise<ListResponse<NotificationList>> => {
  const settings = await NotificationSettingsRepository.getByUserId(userId)
  if (!settings || !settings.allowedTypes || !settings.enableApp)
    return createListResponse([], 0, 0, 0)

  const total = await notificationClient.count({
    where: {
      userId,
      type: { in: settings?.allowedTypes },
    },
  })

  const notifications = await notificationClient.findMany({
    where: {
      userId,
      type: { in: settings?.allowedTypes },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: notificationListSelector,
  })

  const idsToMarkRead = notifications.filter((n) => !n.isRead).map((n) => n.id)

  if (idsToMarkRead.length > 0) {
    await notificationClient.updateMany({
      where: {
        id: { in: idsToMarkRead },
        userId,
        isRead: false,
      },
      data: { isRead: true },
    })
  }

  return createListResponse(notifications, total, page, pageSize)
}

const countUnreadByUser = async (userId: string): Promise<number> => {
  const settings = await NotificationSettingsRepository.getByUserId(userId)

  if (!settings || !settings.allowedTypes || !settings.enableApp) return 0

  const count = await notificationClient.count({
    where: {
      userId,
      isRead: false,
      type: { in: settings?.allowedTypes },
    },
  })

  return count
}

export default {
  listByUser,
  getById,
  create,
  update,
  deleteById,
  markAsRead,
  listAndMarkAllAsRead,
  countUnreadByUser,
}
