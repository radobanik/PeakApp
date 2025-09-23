import { cn, getTextColorForBackground } from '@/lib/utils'
import { RouteSummary } from '@/types/routeTypes'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

export type NewRouteEntryProps = RouteSummary & { approveState: boolean | null }

const NewObjectEntry: FC<NewRouteEntryProps> = (props: NewRouteEntryProps) => {
  return (
    <Link to={`${props.id}`}>
      <div
        className={cn(
          'flex flex-row items-center h-15 min-w-70 hover:bg-secondary-background outline-1 outline-stone-500 rounded-md p-5 mb-2',
          props.approveState === true && 'bg-green-200',
          props.approveState === false && 'bg-red-200'
        )}
      >
        <div>
          <p className="text-md">{props.name}</p>
          <p className="text-sm text-stone-500">{props.climbingStructureType}</p>
        </div>
        <div className="flex-1" />
        <Badge
          variant="outline"
          className="text-sm font-bold w-10 mr-2"
          style={{
            backgroundColor: props.grade.color,
            color: getTextColorForBackground(props.grade.color),
          }}
        >
          <p>{props.grade.name}</p>
        </Badge>
      </div>
    </Link>
  )
}

export default NewObjectEntry
