import toppedIcon from '@/assets/toppedIcon.png'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC, useEffect, useState } from 'react'
import { ActivityEntry } from '@/pages/DiaryPage'
import { Link } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { PeakFile } from '@/types/fileTypes'
import { getFile } from '@/services/fileService'

export type ActivityTableEntryProps = {
  entry: ActivityEntry
  backRoute: string
}

const ActivityTableEntry: FC<ActivityTableEntryProps> = ({
  entry,
  backRoute,
}: ActivityTableEntryProps) => {
  const date = new Date(entry.climbedAt).toLocaleDateString()
  const isSingleAttempt = entry.numOfAttempts === 1
  const attemptsString = `${entry.numOfAttempts} attempt${isSingleAttempt ? '' : 's'}`

  const [image, setImage] = useState<PeakFile | null>(null)

  useEffect(() => {
    if (image === null && entry.imageId) {
      getFile(entry.imageId)
        .then((fetchedImage) => setImage(fetchedImage))
        .catch(() => console.error('Failed to load image'))
    }
  }),
    [entry.imageId]

  console.log(image)

  return (
    <Link to={`${ROUTE.ACTIVITIES}/${entry.id}`} state={{ from: backRoute }} className="w-full">
      <div className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between m-1">
        <div className="w-[70%] p-2">
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
    </Link>
  )
}

export default ActivityTableEntry
