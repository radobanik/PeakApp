import { useQuery } from '@tanstack/react-query'
import { getAndReadAllNotifications } from '@/services/notificationService'

export const useNotificationsQuery = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['notifications', page, pageSize],
    queryFn: () => getAndReadAllNotifications(page, pageSize),
  })
}
