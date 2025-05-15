import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/services/communityService'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import UserAvatar from '@/assets/diddy.webp'
import Like from '@/components/Like'
import { Separator } from '@/components/ui/separator'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import { ClimbingStructureType } from '@/types/routeTypes'

export default function CommunitySessionDetailPage() {
  const params = useParams()
  const sessionQuery = useQuery({
    queryKey: ['community_session_detail', params.id],
    queryFn: () => getSession(params.id!),
    enabled: !!params.id,
  })

  console.log('sessionQuery', sessionQuery.data)
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
            <p className="text-lg font-bold text-ellipsis text-wrap">
              {sessionQuery.data.session.id}
            </p>
            <div className="flex flex-row w-full flex-wrap gap-2">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-row items-center">
                  <div className="flex-1 flex flex-row items-center">
                    <Avatar className="w-12 h-12 flex justify-center items-center ">
                      <AvatarImage src={UserAvatar} className="h-full rounded-full" />
                    </Avatar>
                    <p className="text-sm font-bold ml-2">
                      {sessionQuery.data.session.createdBy.userName}
                    </p>
                  </div>
                </div>
              </div>
              <Like
                likes={sessionQuery.data.likes}
                hasLiked={sessionQuery.data.hasLiked}
                sessionId={sessionQuery.data.session.id}
                className="mr-2"
              />
            </div>
            <Separator className="my-2" />
          </div>
          <div className="flex flex-col space-y-2 w-full flex-1 overflow-auto">
            <div className="w-full">
              <p className="text-md font-bold">Note</p>
              <p className="text-sm">{sessionQuery.data.session.note}</p>
            </div>
            <div className="w-full">
              <p className="text-md font-bold">Pictures & videos</p>
              {'--component to show pictures and videos--'}
            </div>
            <div className="w-full">
              <p className="text-md font-bold">Activities</p>
              <div className="flex flex-col w-full">
                {sessionQuery.data.session.assignedActivities.map((activity) => (
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
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
