import { UserLabeledWithPhoto } from '@/types/authTypes'
import { FC } from 'react'
import NoUserPhoto from '@/assets/NoUserPhoto.png'
import { Rating } from '@smastrom/react-rating'
import { formatTimeAgoShort } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export interface RouteReviewProps {
  id: string
  createdAt: Date
  user: UserLabeledWithPhoto
  rating: number
  comment: string
}

export const RouteReview: FC<RouteReviewProps> = (routeReview: RouteReviewProps) => {
  const userPhoto = routeReview.user.photo?.path ?? NoUserPhoto
  const userFullName = `${routeReview.user.firstName} ${routeReview.user.lastName}`
  const postedAgo = formatTimeAgoShort(routeReview.createdAt)

  return (
    <div className="flex flex-col py-2">
      {/* User photo, name, date, rating */}
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={userPhoto} alt="User Avatar" className="bg-purple-100" />
        </Avatar>
        <span className="font-semibold">{userFullName}</span>
        <span className="text-sm text-gray-400">{postedAgo}</span>
        <span>
          <Rating style={{ maxWidth: 140 }} value={routeReview.rating} readOnly />
        </span>
      </div>

      {/* Comment */}
      <div className="flex flex-col">
        <p className="mt-1 text-base">{routeReview.comment}</p>
      </div>
    </div>
  )
}
