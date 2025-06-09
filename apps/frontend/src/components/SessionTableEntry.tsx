import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { FC, useEffect, useState } from 'react'
import { SessionEntry } from '@/pages/DiaryPage'
import { Link } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { getFile } from '@/services/fileService'

export type SessionTableEntryProps = {
  entry: SessionEntry
  backRoute: string
}

const SessionTableEntry: FC<SessionTableEntryProps> = ({
  entry,
  backRoute,
}: SessionTableEntryProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString()
  const activityString = entry.numberOfActivities === 1 ? ' activity' : ' activities'
  const [sessionPhoto, setSessionPhoto] = useState(NoBoulderPhoto)

  // get photo url
  useEffect(() => {
    const getPhoto = async () => {
      const photo = entry.photo
      if (photo != undefined) {
        const photoFile = await getFile(photo.id)
        setSessionPhoto(photoFile.url)
      }
    }
    getPhoto()
  }, [])

  return (
    <Link to={`${ROUTE.SESSIONS}/${entry.id}`} state={{ from: backRoute }} className="w-full">
      <div className="bg-stone-300 rounded-md p-2 flex flex-row gap-2 justify-between items-center m-1">
        <div className="w-[70%] p-2">
          <h3 className="text-2xl">{entry.name}</h3>
          <div className="flex flex-row justify-between">
            <p>{date}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>{entry.numberOfActivities + activityString}</p>
          </div>
        </div>
        <img
          src={sessionPhoto}
          className="rounded-md max-w-[25%] h-[5em] object-contain lg:max-w-[10%] lg:h-[5em]"
          alt="Session"
        />
      </div>
    </Link>
  )
}

export default SessionTableEntry
