import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNotificationSettings } from '../../services/notificationService'
import type {
  NotificationSettings,
  NotificationSettingsUpdateRequest,
} from '../../types/notificationTypes'

export const useNotificationsSettingsUpdateQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (model: NotificationSettingsUpdateRequest) =>
      updateNotificationSettings({
        enableEmail: model.enableEmail,
        enableApp: model.enableApp,
        allowedTypes: model.allowedTypes,
      }),
    onSuccess: (updated: NotificationSettings) => {
      queryClient.setQueryData(['notification-settings'], updated)
    },
  })
}
