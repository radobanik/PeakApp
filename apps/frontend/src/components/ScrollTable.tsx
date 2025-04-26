import { FC } from 'react'
import { ActivityTableEntryProps } from './ActivityTableEntry'
import { activityEntry, SessionEntry } from '@/pages/DiaryPage'
import { SessionTableEntryProps } from './SessionTableEntry'

type ScrollTableProps =
  | {
      entries: activityEntry[]
      Component: FC<ActivityTableEntryProps>
    }
  | {
      entries: SessionEntry[]
      Component: FC<SessionTableEntryProps>
    }

const ScrollTable = ({ entries, Component }: ScrollTableProps) => {
  return (
    <div>
      {entries.map((entry) => (
        <Component key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default ScrollTable
