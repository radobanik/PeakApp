import { FC } from 'react'
import { ActivityTableEntryProps } from './ActivityTableEntry'
import { ActivityEntry, SessionEntry } from '@/pages/DiaryPage'
import { SessionTableEntryProps } from './SessionTableEntry'
import { SessionActivityTableEntryProps } from './SessionActivityTableEntry'

type ScrollTableProps =
  | {
      entries: ActivityEntry[]
      Component: FC<ActivityTableEntryProps>
      backRoute: string
    }
  | {
      entries: SessionEntry[]
      Component: FC<SessionTableEntryProps>
      backRoute: string
    }
  | {
      entries: ActivityEntry[]
      Component: FC<SessionActivityTableEntryProps>
      backRoute: string
    }
const ScrollTable = ({ entries, Component, backRoute }: ScrollTableProps) => {
  if (entries.length === 0) {
    return <div className="flex justify-center p-4">No entries available</div>
  }
  return (
    <div>
      {entries.map((entry) => (
        <Component key={entry.id} entry={entry} backRoute={backRoute} />
      ))}
    </div>
  )
}

export default ScrollTable
