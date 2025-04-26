import BackButon from '@/components/BackButton'
import HeaderBar from '@/components/HeaderBar'
import threeDots from '@/assets/ThreeDots.png'
import { useQuery } from '@tanstack/react-query'
import { getSessionById } from '@/services/sessionService'
import { useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import ScrollTable from '@/components/ScrollTable'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ROUTE } from '@/constants/routes'

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    throw new Error('Activity ID is required')
  }

  const placeholders = [
    {
      id: 1,
      image: noBoulderPhoto,
    },
    {
      id: 2,
      image: noBoulderPhoto,
    },
    {
      id: 3,
      image: noBoulderPhoto,
    },
    {
      id: 4,
      image: noBoulderPhoto,
    },
  ]

  const sessionQuery = useQuery({
    queryKey: [id],
    queryFn: async () => getSessionById(id),
    select: (data) => ({
      id: data.id,
      createdAt: data.createdAt,
      note: data.note,
      assignedActivities: data.assignedActivities.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        perceivedDifficulty: activity.perceivedDifficulty,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
        notes: activity.notes,
      })),
      createdBy: data.createdBy,
    }),
  })

  return (
    <div className="flex flex-col gap-4">
      <HeaderBar />
      <div>
        <div className="flex flex-row justify-between p-4">
          <BackButon backRoute={ROUTE.SESSIONS} />
          <img src={threeDots} />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {sessionQuery && (
            <Textarea
              disabled
              id="notes"
              placeholder="Write your Notes here..."
              className="resize-none h-[15vh] w-full"
              defaultValue={sessionQuery.data?.note}
            />
          )}

          <ScrollArea className="h-[20vh] w-full rounded-md border overflow-scroll">
            <div className="flex w-max space-x-4 p-4">
              {placeholders.map((placeholder) => (
                <div key={placeholder.id} className="rounded-md shrink-0">
                  <img
                    src={placeholder.image}
                    className="max-h-[15vh] max-w-[15vh] rounded-md"
                    alt="Route"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>

          {sessionQuery.isSuccess && (
            <ScrollTable
              entries={sessionQuery.data?.assignedActivities}
              Component={ActivityTableEntry}
            />
          )}
        </div>
      </div>
    </div>
  )
}
