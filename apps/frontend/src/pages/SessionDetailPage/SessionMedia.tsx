import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SessionDetailContext } from '../SessionDetailPage'
import { useContext } from 'react'

export default function SessionMedia() {
  const { sessionQuery } = useContext(SessionDetailContext)

  return (
    <ScrollArea className="h-[20vh] w-full rounded-md border overflow-scroll">
      <div className="flex w-max space-x-4 p-4">
        {sessionQuery.data?.photos.map((placeholder) => (
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
  )
}
