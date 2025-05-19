import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ClimbingStructureType } from '@/types/routeTypes'
import { ROUTE } from '@/constants/routes'

export type ActivityEntry = {
  id: string
  climbedAt: Date
  routeName: string
  routeGrade: string
  routeType: ClimbingStructureType
  numOfAttempts: number
  topped: boolean
}

export type SessionEntry = {
  id: string
  createdAt: Date
  name: string
  note: string
  numberOfActivities: number
}

export default function DiaryPage() {
  const navigate = useNavigate()
  const navigateToActivities = () => {
    navigate(ROUTE.ACTIVITIES)
  }
  const navigateToSessions = () => {
    navigate(ROUTE.SESSIONS)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-4 ml-auto h-45vh lg:w-[50%] lg:mx-auto md:w-[70%] md:mx-auto">
        <Button className="" onClick={navigateToActivities}>
          My Activities
        </Button>
        <Button onClick={navigateToSessions}>My Sessions</Button>
      </div>
    </div>
  )
}
