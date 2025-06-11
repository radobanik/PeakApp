import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC, useEffect, useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { getFile } from '@/services/fileService'
import { SessionCommunityList } from '@/types/sessionTypes'
import { useFeatureFlagsQuery } from '@/services/queryHooks'

export type CommunitySessionProps = {
  session: SessionCommunityList
}

const CommunitySession: FC<CommunitySessionProps> = ({ session }: CommunitySessionProps) => {
  const [sessionPhoto, setSessionPhoto] = useState(NoBoulderPhoto)
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>()

  const featureFlagsQuery = useFeatureFlagsQuery()

  // get photo url
  useEffect(() => {
    const getPhoto = async () => {
      const photo = session.photo
      if (photo != undefined) {
        const photoFile = await getFile(photo.id)
        setSessionPhoto(photoFile.url)
      }
      if (session.createdBy?.profilePictureId) {
        const profilePicture = await getFile(session.createdBy.profilePictureId)
        setProfilePictureUrl(profilePicture.url)
      }
    }
    getPhoto()
  }, [session])

  const renderCommentsCount = () => {
    if (!featureFlagsQuery.data?.commentsEnabled) return null

    return (
      <p>
        {session.comments} comment{session.comments !== 1 ? 's' : ''}
      </p>
    )
  }

  return (
    <Link to={ROUTE.COMMUNITY_DETAIL(session.id)}>
      <div className="min-w-[200px] max-w-[400px] flex flex-col">
        <img src={sessionPhoto}></img>
        <div className="flex flex-col bg-secondary-background p-2">
          <p className="text-md font-bold">{session.name}</p>
          <div className="flex flex-row items-center">
            <div className="flex-1 flex flex-row items-center">
              <Avatar className="h-12 flex justify-center items-center ">
                <AvatarImage src={profilePictureUrl} />
              </Avatar>
              <p className="text-sm font-bold ml-2">{session.createdBy.userName}</p>
            </div>
            <p className="text-sm font-bold">
              {new Date(session.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row">
            <p className="flex-1">
              {session.likes} like{session.likes !== 1 ? 's' : ''}
            </p>
            {renderCommentsCount()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CommunitySession
