import { NotificationType } from '@prisma/client'
import { z } from 'zod'

type NotificationSettingsUpdate = {
  enableApp?: boolean
  enableEmail?: boolean
  allowedTypes?: NotificationType[]
}

const validateNotificationSettingsUpdate = (entity: NotificationSettingsUpdate) =>
  z
    .object({
      enableApp: z.boolean().optional(),
      enableEmail: z.boolean().optional(),
      allowedTypes: z.array(z.nativeEnum(NotificationType)).optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationSettingsUpdate }
export { validateNotificationSettingsUpdate }
