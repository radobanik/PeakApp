import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { NotificationSettings, NotificationType } from './../types/notificationTypes'

export default function NotificationsSettingsDialog({
  open,
  onOpenChange,
  initialSettings,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialSettings: NotificationSettings
  onSave: (settings: NotificationSettings) => void
}) {
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings)

  useEffect(() => {
    if (open) {
      setSettings(initialSettings)
    }
  }, [open, initialSettings])

  const toggleType = (type: NotificationType, enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      allowedTypes: enabled
        ? [...prev.allowedTypes, type]
        : prev.allowedTypes.filter((t) => t !== type),
    }))
  }

  const update = (key: keyof Omit<NotificationSettings, 'allowedTypes'>, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl p-7">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="pt-2">
            <Label className="text-2sm text-muted-foreground">
              Where do you want to be notified?
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <Label>App Notifications</Label>
            <Switch
              checked={settings.enableApp}
              onCheckedChange={(val) => update('enableApp', val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch
              checked={settings.enableEmail}
              onCheckedChange={(val) => update('enableEmail', val)}
            />
          </div>

          <div className="pt-2">
            <Label className="text-2sm text-muted-foreground">
              What do you want to be notified for?
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <Label>Like Notifications</Label>
            <Switch
              checked={settings.allowedTypes.includes(NotificationType.LIKES)}
              onCheckedChange={(val) => toggleType(NotificationType.LIKES, val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Comment Notifications</Label>
            <Switch
              checked={settings.allowedTypes.includes(NotificationType.COMMENTS)}
              onCheckedChange={(val) => toggleType(NotificationType.COMMENTS, val)}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(settings)
              onOpenChange(false)
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
