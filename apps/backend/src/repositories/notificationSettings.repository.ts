import { PrismaClient } from '@prisma/client'
import {
  NotificationSettings,
  NotificationSettingsUpdate,
  notificationSettingsSelector,
} from '../model/notificationSettings'

const client = new PrismaClient().userNotificationSettings

const getByUserId = async (userId: string): Promise<NotificationSettings | null> => {
  return await client.findUnique({
    where: { userId },
    select: notificationSettingsSelector,
  })
}

const updateByUserId = async (
  userId: string,
  data: NotificationSettingsUpdate
): Promise<NotificationSettings> => {
  try {
    return await client.update({
      where: { userId },
      data,
      select: notificationSettingsSelector,
    })
  } catch (error) {
    console.error('Error updating notification settings:', error)
    throw error
  }
}

export default {
  getByUserId,
  updateByUserId,
}
