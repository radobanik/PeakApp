import { ClimbingStructureType } from '@/types/routeTypes'
import toppedIcon from '@/assets/toppedIcon.png'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC } from 'react'

export type ActivityTableEntryProps = {
  activity: {
    id: string
    climbedAt: Date
    routeName: string
    routeGrade: string
    routeType: ClimbingStructureType
    numOfAttempts: number
    topped: boolean
  }
}

const ActivityTableEntry: FC<ActivityTableEntryProps> = (props: ActivityTableEntryProps) => {
  const date = new Date(props.activity.climbedAt).toLocaleDateString()
  const attemptsString = props.activity.numOfAttempts === 1 ? ' attempt' : ' attempts'

  return (
    <div className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between m-1">
      <div className="w-[70%] p-2">
        <h3 className="text-2xl">{props.activity.routeName}</h3>
        <div className="flex flex-row justify-between">
          <p>{date}</p>
          <p>{props.activity.routeGrade}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>{props.activity.numOfAttempts + attemptsString}</p>
          <div className="">{props.activity.topped && <img src={toppedIcon} />}</div>
        </div>
      </div>
      <img src={noBoulderPhoto} className="rounded-md max-w-[25%] max-h-[25%]" alt="Route" />
    </div>
  )
}

export default ActivityTableEntry
