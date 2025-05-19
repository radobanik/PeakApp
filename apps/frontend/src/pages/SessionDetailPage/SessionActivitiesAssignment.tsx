import BackButton from '@/components/BackButton'
import { ROUTE } from '@/constants/routes'
import { useContext } from 'react'
import { SessionDetailContext } from '../SessionDetailPage'
import SessionActivitiesInput from './SessionActivitiesInput'

export default function SessionActivitiesAssignment() {
  const { setCurrentView } = useContext(SessionDetailContext)
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-row p-4 gap-4">
        <BackButton
          backRoute={ROUTE.SESSIONS}
          operation={() => {
            setCurrentView('session')
          }}
        />
        <h1 className="text-2xl">Change Assigned Activities</h1>
      </div>
      <div className="flex flex-row justify-center p-4 gap-4">
        <SessionActivitiesInput />
      </div>
    </div>
  )
}
