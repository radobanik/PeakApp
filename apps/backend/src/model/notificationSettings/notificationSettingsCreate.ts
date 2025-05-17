import { z } from 'zod'

type NotificationSettingsCreate = {
  userId: string

  disabled?: boolean
  disableLikes?: boolean
  disableComments?: boolean
  emailNotifications?: boolean
}

const validateNotificationSettingsCreate = (entity: NotificationSettingsCreate) =>
  z
    .object({
      userId: z.string().uuid(),
      disabled: z.boolean().optional(),
      disableLikes: z.boolean().optional(),
      disableComments: z.boolean().optional(),
      emailNotifications: z.boolean().optional(),
    })
    .strict()
    .safeParse(entity)

export type { NotificationSettingsCreate }
export { validateNotificationSettingsCreate }
