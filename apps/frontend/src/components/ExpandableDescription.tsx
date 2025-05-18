import { FC, useState } from 'react'
import { cn } from '@/lib/utils'

export type ExpandableDescriptionProps = {
  text: string
}

const ExpandableDescription: FC<ExpandableDescriptionProps> = ({
  text,
}: ExpandableDescriptionProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <p className={cn('text-sm text-muted-foreground', !expanded && `line-clamp-3`)}>{text}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-medium text-black font-bold hover:underline"
      >
        {expanded ? 'Show less' : 'Show full'}
      </button>
    </div>
  )
}

export default ExpandableDescription
