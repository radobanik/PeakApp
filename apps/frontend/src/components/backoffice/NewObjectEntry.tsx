import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export type NewObjectEntryType = {
  id: string
  name: string
}
export type NewObjectEntryProps = NewObjectEntryType & { approveState: boolean | null }

const NewObjectEntry: FC<NewObjectEntryProps> = (props: NewObjectEntryProps) => {
  return (
    <Link to={`${props.id}`}>
      <div
        className={cn(
          'flex flex-row items-center h-15 min-w-70 hover:bg-stone-200 outline-1 outline-stone-400 rounded-md p-5 mb-2',
          props.approveState === true && 'bg-green-200',
          props.approveState === false && 'bg-red-200'
        )}
      >
        <p className="text-md">{props.name}</p>
      </div>
    </Link>
  )
}

export default NewObjectEntry
