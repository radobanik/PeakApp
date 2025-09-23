import { useQuery } from '@tanstack/react-query'
import { getNotificationSettings } from '@/services/notificationService'

export const useNotificationSettingsQuery = () => {
  return useQuery({
    queryKey: ['notification-settings'],
    queryFn: getNotificationSettings,
  })
}
