import { z } from 'zod'

type NotificationUpdate = {
  title?: string
  message?: string
  isRead?: boolean
}

const validateNotificationUpdate = (entity: NotificationUpdate) =>
  z
    .object({
      title: z.string().min(1).max(100).optional(),
      message: z.string().min(1).max(500).optional(),
      isRead: z.boolean().optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationUpdate }
export { validateNotificationUpdate }
