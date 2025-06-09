import toppedIcon from '@/assets/toppedIcon.png'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { ActivityEntry } from '@/pages/DiaryPage'
import { Checkbox } from './ui/checkbox'
import { useContext, useEffect, useState } from 'react'
import { SessionActivitiesContext } from '@/pages/SessionDetailPage/SessionDetail'
import { PeakFile } from '@/types/fileTypes'
import { getFile } from '@/services/fileService'

export type SessionActivityTableEntryProps = {
  entry: ActivityEntry
  backRoute: string
}

export default function SessionActivityTableEntry({ entry }: SessionActivityTableEntryProps) {
  const { checkedEntriesIds, addCheckedEntriesIds, removeCheckedEntriesIds } =
    useContext(SessionActivitiesContext)
  const date = new Date(entry.climbedAt).toLocaleDateString()
  const isSingleAttempt = entry.numOfAttempts === 1
  const attemptsString = `${entry.numOfAttempts} attempt${isSingleAttempt ? '' : 's'}`
  const [checked, setChecked] = useState(checkedEntriesIds.includes(entry.id))
  const [image, setImage] = useState<PeakFile | null>(null)

  const handleEntryClick = () => {
    if (checked) {
      removeCheckedEntriesIds(entry.id)
      setChecked(false)
    } else {
      addCheckedEntriesIds(entry.id)
      setChecked(true)
    }
  }

  useEffect(() => {
    if (image === null && entry.imageId) {
      getFile(entry.imageId)
        .then((fetchedImage) => setImage(fetchedImage))
        .catch(() => console.error('Failed to load image'))
    }
  }, [entry.imageId])

  return (
    <div
      className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between m-1"
      test-id={`session-activity-table-entry-${entry.id}`}
      onClick={handleEntryClick}
    >
      <div className="w-[10%]] p-2 flex justify-center items-center">
        <Checkbox id={entry.id} checked={checked} onClick={(e) => e.stopPropagation()} />
      </div>
      <div className="w-[60%] p-2">
        <h3 className="text-2xl">{entry.routeName}</h3>
        <div className="flex flex-row justify-between">
          <p>{date}</p>
          <p>{entry.routeGrade.toUpperCase()}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>{attemptsString}</p>
          <div className="">{entry.topped && <img src={toppedIcon} />}</div>
        </div>
      </div>
      <img
        src={image === null ? noBoulderPhoto : image.url}
        className="rounded-md max-w-[25%] max-h-[25%]"
        alt="Route"
      />
    </div>
  )
}
