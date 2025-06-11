import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import NoUserPhoto from '@/assets/NoUserPhoto.png'
import { UserList } from 'backend/src/model/user'
import { useEffect, useState } from 'react'
import * as userService from '@/services/userService'
import { toast } from 'sonner'
import { getFile } from '@/services/fileService'

type UserProfileDialogProps = {
  user: UserList
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UserProfileDialog = ({ user, open, onOpenChange }: UserProfileDialogProps) => {
  const profilePicture = NoUserPhoto
  const fullName = `${user.firstName} ${user.lastName}`

  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await userService.isFollowingUsser(user.id)
        setIsFollowing(response.isFollowing)
      } catch {
        toast.error('Failed to check following status')
      }
    }

    if (open) {
      fetchFollowing()
    }
  }, [user.id, open])

  const handleToggleFollow = async () => {
    setLoading(true)
    try {
      if (isFollowing) {
        await userService.unfollowUser(user.id)
        toast.success('Unfollowed user.')
        setIsFollowing(false)
      } else {
        await userService.followUser(user.id)
        toast.success('Followed user.')
        setIsFollowing(true)
      }
    } catch {
      toast.error('Failed to update follow status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user.profilePictureId) {
        try {
          const file = await getFile(user.profilePictureId)
          setProfilePictureUrl(file.url)
        } catch {
          setProfilePictureUrl(null)
          toast.error('Failed to load profile picture')
        }
      } else {
        setProfilePictureUrl(null)
      }
    }

    if (open) {
      fetchProfilePicture()
    }
  }, [user.profilePictureId, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[600px] sm:m-4 md:m-4 lg:m-0 p-4">
        <DialogHeader>
          <DialogTitle className="text-center">User Profile</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>
        <Card className="shadow-none border-none">
          <CardContent>
            <div className="flex flex-row items-center gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profilePictureUrl || NoUserPhoto} />
              </Avatar>

              <div className="flex flex-col">
                <div className="text-xl font-semibold">{fullName}</div>
                <div className="text-sm text-muted-foreground">@{user.userName}</div>
                {user.description && (
                  <p className="text-sm text-gray-500 mt-2">{user.description}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button size="sm" onClick={handleToggleFollow} disabled={loading}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  Close
                </Button>
              </DialogClose>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
