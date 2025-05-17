import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { NotificationListItem } from '@/types/notificationTypes'

type NotificationCardProps = {
  notification: NotificationListItem
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Card
      className={cn(
        'border-l-4 rounded-sm shadow-sm',
        notification.isRead ? 'border-gray-300' : 'border-blue-500 bg-blue-50'
      )}
    >
      <CardContent className="py-4 space-y-1">
        <div className="text-sm text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString()}
        </div>
        <div className="font-medium text-base">{notification.title}</div>
        <p className="text-sm text-gray-700">{notification.message}</p>
      </CardContent>
    </Card>
  )
}

export default NotificationCard
