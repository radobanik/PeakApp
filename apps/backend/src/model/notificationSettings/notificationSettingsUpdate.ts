import { z } from 'zod'

type NotificationSettingsUpdate = {
  enableApp?: boolean
  enableLikes?: boolean
  enableComments?: boolean
  enableEmail?: boolean
}

const validateNotificationSettingsUpdate = (entity: NotificationSettingsUpdate) =>
  z
    .object({
      enableApp: z.boolean().optional(),
      enableLikes: z.boolean().optional(),
      enableComments: z.boolean().optional(),
      enableEmail: z.boolean().optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationSettingsUpdate }
export { validateNotificationSettingsUpdate }
