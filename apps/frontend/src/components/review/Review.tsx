import NoUserPhoto from '@/assets/NoUserPhoto.png'
import { Rating } from '@smastrom/react-rating'
import { formatTimeAgoShort } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { memo, useEffect, useState } from 'react'
import { UserLabeled } from '@/types/userTypes'
import { getFile } from '@/services/fileService'

export interface ReviewProps {
  createdAt: Date
  createdBy: UserLabeled
  stars: number
  text: string
}

const Review = ({ createdAt, createdBy, stars, text }: ReviewProps) => {
  const userFullName = `${createdBy.firstName} ${createdBy.lastName}`
  const postedAgo = formatTimeAgoShort(createdAt)

  const [pfpUrl, setPfpUrl] = useState<string | null>(null)
  const userPhoto = pfpUrl ?? NoUserPhoto

  useEffect(() => {
    const fetchFile = async () => {
      if (createdBy.profilePictureId) {
        const pfpFile = await getFile(createdBy.profilePictureId)
        setPfpUrl(pfpFile?.url)
      }
    }
    fetchFile()
  }, [createdBy.profilePictureId])

  return (
    <div className="flex flex-col py-2">
      {/* User photo, name, date, stars */}
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={userPhoto} alt="User Avatar" className="bg-purple-100" />
        </Avatar>
        <span className="font-semibold">{userFullName}</span>
        <span className="text-sm text-gray-400">{postedAgo}</span>
        <span>
          <Rating style={{ maxWidth: 140 }} value={stars} readOnly />
        </span>
      </div>

      {/* text */}
      <div className="flex flex-col">
        <p className="mt-1 text-base">{text}</p>
      </div>
    </div>
  )
}

export default memo(Review)
