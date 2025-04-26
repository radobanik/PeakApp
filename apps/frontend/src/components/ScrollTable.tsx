import { FC } from 'react'
import { ActivityTableEntryProps } from './ActivityTableEntry'
import { ActivityEntry, SessionEntry } from '@/pages/DiaryPage'
import { SessionTableEntryProps } from './SessionTableEntry'

type ScrollTableProps =
  | {
      entries: ActivityEntry[]
      Component: FC<ActivityTableEntryProps>
    }
  | {
      entries: SessionEntry[]
      Component: FC<SessionTableEntryProps>
    }

const ScrollTable = ({ entries, Component }: ScrollTableProps) => {
  if (entries.length === 0) {
    return <div className="flex justify-center p-4">No entries available</div>
  }
  return (
    <div>
      {entries.map((entry) => (
        <Component key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default ScrollTable
