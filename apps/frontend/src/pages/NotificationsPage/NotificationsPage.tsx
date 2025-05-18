import { useEffect, useState } from 'react'
import NotificationCard from '@/components/NotificationCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import NotificationsSettingsDialog from '@/components/NotificationSettingsDialog'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Settings2Icon,
} from 'lucide-react'
import { useNotificationsQuery } from './useNotificationsQuery'
import { useNotificationSettingsQuery } from './useNotificationsSettingsQuery'
import { useNotificationsSettingsUpdateQuery } from './useNotificationsSettingsUpdateQuery'
import type { NotificationSettings } from '@/types/notificationTypes'
import { useNotificationContext } from '@/App'

const NotificationsPage = () => {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dialogSettings, setDialogSettings] = useState<NotificationSettings | null>(null)

  const { unreadCount, refetchUnread } = useNotificationContext()

  const { data, isLoading, isError, isSuccess } = useNotificationsQuery(page, pageSize)
  const notifications = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  useEffect(() => {
    if (isSuccess && unreadCount > 0) {
      refetchUnread()
    }
  }, [isSuccess])

  const {
    data: notificationSettings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useNotificationSettingsQuery()

  const { mutate: saveSettings } = useNotificationsSettingsUpdateQuery()

  if (isError) toast.error('Failed to fetch notifications.')
  if (settingsError) toast.error('Failed to fetch notification settings.')

  const handleSaveSettings = (updated: NotificationSettings) => {
    saveSettings(updated, {
      onSuccess: () => toast.success('Notification settings saved.'),
      onError: () => toast.error('Failed to save notification settings.'),
    })
  }

  const handleOpenSettings = () => {
    const initial = notificationSettings ?? {
      enableApp: false,
      enableEmail: false,
      allowedTypes: [],
    }
    setDialogSettings(initial)
    setSettingsOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-lg sm:max-w-2xl lg:max-w-xl mx-auto my-6 border shadow-sm sm:px-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg sm:text-xl">Notifications</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenSettings}
            disabled={settingsLoading || settingsError}
          >
            <Settings2Icon className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-6 text-sm sm:text-base">
              Loading...
            </p>
          ) : notifications.length === 0 ? (
            <p className="text-muted-foreground text-sm sm:text-base">No notifications yet.</p>
          ) : (
            <>
              {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
                <div className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    <ChevronsLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    <ChevronsRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {dialogSettings && (
        <NotificationsSettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          initialSettings={dialogSettings}
          onSave={handleSaveSettings}
        />
      )}
    </>
  )
}

export default NotificationsPage
