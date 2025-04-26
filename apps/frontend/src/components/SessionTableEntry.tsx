import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC } from 'react'
import { SessionEntry } from '@/pages/DiaryPage'
import { useNavigate } from 'react-router-dom'

export type SessionTableEntryProps = {
  entry: SessionEntry
}

const SessionTableEntry: FC<SessionTableEntryProps> = ({ entry }: SessionTableEntryProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString()
  const activityString = entry.numberOfActivities === 1 ? ' activity' : ' activities'

  const navigate = useNavigate()
  const navigateToSession = () => {
    navigate(`/sessions/${entry.id}`)
  }

  return (
    <div
      className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between m-1"
      onClick={navigateToSession}
    >
      <div className="w-[70%] p-2">
        <h3 className="text-2xl">{entry.id}</h3>
        <div className="flex flex-row justify-between">
          <p>{date}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>{entry.numberOfActivities + activityString}</p>
        </div>
      </div>
      <img src={noBoulderPhoto} className="rounded-md max-w-[25%] max-h-[25%]" alt="Route" />
    </div>
  )
}

export default SessionTableEntry
