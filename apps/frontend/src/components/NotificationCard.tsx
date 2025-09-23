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
        'rounded-sm shadow-sm',
        notification.isRead
          ? 'border-gray-300'
          : 'border-blue-500 bg-secondary-background hover:bg-secondary-background/80'
      )}
    >
      <CardContent className="space-y-2 py-0">
        <div className="text-sm text-muted-foreground">
          {new Date(notification.createdAt).toLocaleString()}
        </div>
        <div className="font-medium text-xl">{notification.title}</div>
        <p className="text-sm text-foreground/50">{notification.message}</p>
      </CardContent>
    </Card>
  )
}

export default NotificationCard
