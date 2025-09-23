import { z } from 'zod'

type NotificationSettingsCreate = {
  userId: string

  enableApp?: boolean
  enableLikes?: boolean
  enableComments?: boolean
  enableEmail?: boolean
}

const validateNotificationSettingsCreate = (entity: NotificationSettingsCreate) =>
  z
    .object({
      userId: z.string().uuid(),
      enableApp: z.boolean().optional(),
      enableLikes: z.boolean().optional(),
      enableComments: z.boolean().optional(),
      enableEmail: z.boolean().optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationSettingsCreate }
export { validateNotificationSettingsCreate }
