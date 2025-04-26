import toppedIcon from '@/assets/toppedIcon.png'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC } from 'react'
import { activityEntry } from '@/pages/DiaryPage'
import { useNavigate } from 'react-router-dom'

export type ActivityTableEntryProps = {
  entry: activityEntry
}

const ActivityTableEntry: FC<ActivityTableEntryProps> = ({ entry }: ActivityTableEntryProps) => {
  const date = new Date(entry.climbedAt).toLocaleDateString()
  const attemptsString = entry.numOfAttempts === 1 ? ' attempt' : ' attempts'

  const navigation = useNavigate()
  const navigateToActivity = () => {
    navigation(`/activities/${entry.id}`)
  }

  return (
    <div
      className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between m-1"
      onClick={navigateToActivity}
    >
      <div className="w-[70%] p-2">
        <h3 className="text-2xl">{entry.routeName}</h3>
        <div className="flex flex-row justify-between">
          <p>{date}</p>
          <p>{entry.routeGrade.toUpperCase()}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>{entry.numOfAttempts + attemptsString}</p>
          <div className="">{entry.topped && <img src={toppedIcon} />}</div>
        </div>
      </div>
      <img src={noBoulderPhoto} className="rounded-md max-w-[25%] max-h-[25%]" alt="Route" />
    </div>
  )
}

export default ActivityTableEntry
