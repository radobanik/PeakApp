import { z } from 'zod'

type NotificationCreate = {
  userId: string
  title: string
  message: string
}

const validateNotificationCreate = (entity: NotificationCreate) =>
  z
    .object({
      userId: z.string().uuid(),
      title: z.string().min(1).max(100),
      message: z.string().min(1).max(500),
    })
    .strict()
    .safeParse(entity)

export type { NotificationCreate }
export { validateNotificationCreate }
