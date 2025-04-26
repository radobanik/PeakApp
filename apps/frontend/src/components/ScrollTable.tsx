import { FC } from 'react'
import ActivityTableEntry from './ActivityTableEntry'
import { ClimbingStructureType } from '@/types/routeTypes'

export type ActivitiesEntryProps = {
  activities: {
    id: string
    climbedAt: Date
    routeName: string
    routeGrade: string
    routeType: ClimbingStructureType
    numOfAttempts: number
    topped: boolean
  }[]
}

const ScrollTable: FC<ActivitiesEntryProps> = (props: ActivitiesEntryProps) => {
  return (
    <div>
      {props.activities.map((activity) => (
        <ActivityTableEntry key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

export default ScrollTable
