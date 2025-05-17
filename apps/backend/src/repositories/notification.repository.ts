import { PrismaClient } from '@prisma/client'
import {
  Notification,
  NotificationCreate,
  NotificationUpdate,
  NotificationList,
  notificationListSelector,
  notificationSelector,
} from '../model/notification'

const notificationClient = new PrismaClient().notification

const listByUser = async (userId: string): Promise<NotificationList[]> => {
  return await notificationClient.findMany({
    where: { userId },
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

const listAndMarkAllAsRead = async (userId: string): Promise<NotificationList[]> => {
  var beforeUpdate = await notificationClient.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: notificationListSelector,
  })

  await notificationClient.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  })

  return beforeUpdate
}

const countUnreadByUser = async (userId: string): Promise<number> => {
  const count = await notificationClient.count({
    where: {
      userId,
      isRead: false,
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
