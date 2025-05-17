import { z } from 'zod'

type NotificationSettingsUpdate = {
  disabled?: boolean
  disableLikes?: boolean
  disableComments?: boolean
  emailNotifications?: boolean
}

const validateNotificationSettingsUpdate = (entity: NotificationSettingsUpdate) =>
  z
    .object({
      disabled: z.boolean().optional(),
      disableLikes: z.boolean().optional(),
      disableComments: z.boolean().optional(),
      emailNotifications: z.boolean().optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationSettingsUpdate }
export { validateNotificationSettingsUpdate }
