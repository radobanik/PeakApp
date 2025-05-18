import { NotificationType } from '@prisma/client'
import { z } from 'zod'

type NotificationCreate = {
  userId: string
  title: string
  message: string,
  type: NotificationType
}

const validateNotificationCreate = (entity: NotificationCreate) =>
  z
    .object({
      userId: z.string().uuid(),
      title: z.string().min(1).max(100),
      message: z.string().min(1).max(500),
      type: z.nativeEnum(NotificationType),
    })
    .strict()
    .safeParse(entity)

export type { NotificationCreate }
export { validateNotificationCreate }
