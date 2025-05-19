import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AchievementDetailWithIconMetadata } from '@/types/achievementTypes'
import { getUserAchievements } from '@/services/achievementService'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'

interface AchievementListingProps {
  userId: string | null
}

export const AchievementListing: FC<AchievementListingProps> = ({ userId }) => {
  const [selectedAchievementForDialog, setSelectedAchievementForDialog] =
    useState<AchievementDetailWithIconMetadata | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const userAchievementsQuery = useQuery({
    queryKey: ['userAchievements', userId],
    queryFn: () => getUserAchievements(userId!),
    enabled: !!userId,
  })

  const handleOpenDetailsDialog = (achievement: AchievementDetailWithIconMetadata) => {
    setSelectedAchievementForDialog(achievement)
    setIsDetailsDialogOpen(true)
  }

  if (userAchievementsQuery.isLoading) {
    return <div className="text-center">Loading achievements...</div>
  }

  if (userAchievementsQuery.isError) {
    const error = userAchievementsQuery.error as Error
    return (
      <div className="text-center text-red-500">
        Error loading achievements: {error.message || 'Unknown error'}
      </div>
    )
  }

  if (
    userAchievementsQuery.isSuccess &&
    (!userAchievementsQuery.data || userAchievementsQuery.data.length === 0)
  ) {
    return <div className="text-center">No achievements found for this user.</div>
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {userAchievementsQuery.data?.map((achievement) => (
        <div
          key={achievement.id}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleOpenDetailsDialog(achievement)}
        >
          <img
            src={achievement.icon?.url ?? noBoulderPhoto}
            alt={achievement.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            onError={(e) => {
              e.currentTarget.src = noBoulderPhoto
            }}
          />
        </div>
      ))}

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedAchievementForDialog?.name}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <p> {selectedAchievementForDialog?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
