import { useEffect, useState } from 'react'
import { getAndReadAllNotifications } from '@/services/notificationService'
import { NotificationListItem } from '@/types/notificationTypes'
import NotificationCard from '@/components/NotificationCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationListItem[]>([])

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getAndReadAllNotifications()
        setNotifications(data)
      } catch (error) {
        toast.error('Failed to fetch notifications.')
      }
    }

    fetchNotifications()
  }, [])

  return (
    <Card className="max-w-3xl mx-auto my-6 border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default NotificationsPage
