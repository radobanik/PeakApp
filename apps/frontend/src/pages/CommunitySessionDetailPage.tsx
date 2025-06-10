import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/services/communityService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Like from '@/components/Like'
import { Separator } from '@/components/ui/separator'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import { ClimbingStructureType } from '@/types/routeTypes'
import CommentListing from '@/components/CommentListing'
import { ROUTE } from '@/constants/routes'
import MediaScroll from '@/components/MediaScroll'
import { useEffect, useState } from 'react'
import { PeakFile } from '@/types/fileTypes'
import { getFile } from '@/services/fileService'
import { useFeatureFlagsQuery } from '@/services/queryHooks'

export default function CommunitySessionDetailPage() {
  const [media, setMedia] = useState<PeakFile[]>([])
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>()

  const featureFlagsQuery = useFeatureFlagsQuery()

  const params = useParams()
  const sessionQuery = useQuery({
    queryKey: ['community_session_detail', params.id],
    queryFn: () => getSession(params.id!),
    enabled: !!params.id,
  })
  useEffect(() => {
    const processFiles = async () => {
      if (sessionQuery.isSuccess) {
        const fileRefs = sessionQuery.data?.photos ?? []

        const peakFilePromises = fileRefs.map((ref) => getFile(ref.id))
        setMedia(await Promise.all(peakFilePromises))

        if (sessionQuery.data?.createdBy?.profilePictureId) {
          const profilePicture = await getFile(sessionQuery.data.createdBy.profilePictureId)
          setProfilePictureUrl(profilePicture.url)
        }
      }
    }
    processFiles()
  }, [sessionQuery.isSuccess])

  const renderComments = () => {
    if (!featureFlagsQuery.data?.commentsEnabled || !sessionQuery.isSuccess) return null

    return (
      <div className="w-full">
        <p className="text-md font-bold">Comments</p>
        <CommentListing sessionId={sessionQuery.data.id} className="flex-1 overflow-auto" />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      {sessionQuery.isLoading && (
        <p className="flex flex-1 item-center justify-center">Loading...</p>
      )}
      {sessionQuery.isError && (
        <p className="flex flex-1 item-center justify-center">
          Error loading session: {sessionQuery.error.message}
        </p>
      )}
      {sessionQuery.isSuccess && (
        <>
          <div className="sticky top-0 bg-white p-2 ">
            <p className="text-xl font-bold text-ellipsis text-wrap text-center">
              {sessionQuery.data.name}
            </p>
            <div className="flex flex-row w-full flex-wrap gap-2">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-row items-center">
                  <div className="flex-1 flex flex-row items-center">
                    <Avatar className="w-12 h-12 flex justify-center items-center ">
                      <AvatarImage src={profilePictureUrl} className="h-full rounded-full" />
                    </Avatar>
                    <p className="text-sm font-bold ml-2">{sessionQuery.data.createdBy.userName}</p>
                  </div>
                </div>
              </div>
              <Like
                likes={sessionQuery.data.likes}
                hasLiked={sessionQuery.data.hasLiked}
                sessionId={sessionQuery.data.id}
                className="mr-2"
              />
            </div>
            <Separator className="my-2" />
          </div>
          <div className="flex flex-col space-y-2 w-full flex-1 overflow-auto">
            <div className="w-full">
              <p className="text-md font-bold">Note</p>
              <p className="text-sm">{sessionQuery.data.note}</p>
            </div>
            {/* for some reason  Activities component is rendering on Media component, solved by mb-6, maybe fix later*/}
            <div className="w-full mb-6 h-[20vh]">
              <p className="text-md font-bold">Pictures & videos</p>
              {sessionQuery.isSuccess && (
                <MediaScroll {...{ media, setMedia: (_) => {}, editable: false }} />
              )}
            </div>
            <div className="w-full">
              <p className="text-md font-bold">Activities</p>
              <div className="flex flex-col w-full">
                {sessionQuery.data.assignedActivities.map((activity) => (
                  <ActivityTableEntry
                    key={activity.id}
                    entry={{
                      id: activity.id,
                      climbedAt: activity.climbedAt,
                      routeName: activity.route.name,
                      routeGrade: activity.route.grade.name,
                      routeType: activity.route.climbingStructureType as ClimbingStructureType,
                      numOfAttempts: activity.numOfAttempts,
                      topped: activity.topped,
                    }}
                    backRoute={ROUTE.COMMUNITY_DETAIL(params.id!)}
                  />
                ))}
              </div>
            </div>
            {renderComments()}
          </div>
        </>
      )}
    </div>
  )
}
