import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { useState } from 'react'
import { getActivities, getActivityById } from '@/services/activityService'
import { getSessionById, getSessions } from '@/services/sessionService'
import { useQuery } from '@tanstack/react-query'

import toppedIcon from '../assets/toppedIcon.png'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export type activityEntry = {
  id: string
  climbedAt: Date
  routeName: string
  routeGrade: string
  routeType: string
  numOfAttempts: number
  topped: boolean
}

export type SessionEntry = {
  id: string
  createdAt: Date
  note: string
  numberOfActivities: number
}

const activityColumns: ColumnDef<activityEntry>[] = [
  {
    accessorKey: 'climbedAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('climbedAt'))
      return date.toLocaleDateString('sk-SK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },
  },
  {
    accessorKey: 'routeName',
    header: 'Route',
  },
  {
    accessorKey: 'routeGrade',
    header: 'Grade',
  },
  {
    accessorKey: 'routeType',
    header: 'Type',
  },
  {
    accessorKey: 'numOfAttempts',
    header: 'Attempts',
  },
  {
    accessorKey: 'topped',
    header: 'Topped',
    cell: ({ row }) => {
      const topped = row.getValue('topped')
      return topped ? <img src={toppedIcon} /> : ''
    },
  },
]

const sessionColumns: ColumnDef<SessionEntry>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return date.toLocaleDateString('sk-SK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },
  },
  {
    accessorKey: 'note',
    header: 'Name',
  },
  {
    accessorKey: 'numberOfActivities',
    header: 'Activities',
    cell: ({ row }) => {
      const amount = parseInt(row.getValue('numberOfActivities'))
      if (amount === 1) {
        return '1 Activity'
      }

      return amount + ' Activities'
    },
  },
]

export default function DiaryPage() {
  const [activitiesPageIndex, setActivitiesPageIndex] = useState(0)
  const [activitiesPageSize, setActivitiesPageSize] = useState(5)

  const navigate = useNavigate()
  const navigateToActivities = () => {
    navigate('/activities')
  }

  const activitiesQuery = useQuery({
    queryKey: ['activities', activitiesPageIndex, activitiesPageSize],
    queryFn: async () =>
      getActivities(),
    select: (data) => ({
      items: data.items.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
      })),
      totalCount: data.total,
    }),
  })

  const [sessionsPageIndex, setSessionsPageIndex] = useState(0)
  const [sessionsPageSize, setSessionsPageSize] = useState(5)

  const sessionsQuery = useQuery({
    queryKey: ['sessions', sessionsPageIndex, sessionsPageSize],
    queryFn: async () => getSessions({ pageIndex: sessionsPageIndex, pageSize: sessionsPageSize }),
    select: (data) => ({
      items: data.items.map((session) => ({
        id: session.id,
        createdAt: session.createdAt,
        note: session.note,
        numberOfActivities: session.assignedActivities.length,
      })),
      totalCount: data.total,
    }),
  })

  return (
    <>
      <div className="flex flex-col gap-4 p-4 w-3/4 ml-auto h-45vh border-1 bg-stone-800">
        <Button className="" onClick={navigateToActivities}>
          My Activities
        </Button>
        <h3 className="text-2xl font-bold text-white">My Sessions</h3>
        {sessionsQuery.isLoading ? (
          <div>Loading...</div>
        ) : sessionsQuery.isError ? (
          <div className="text-white">{sessionsQuery.error.message}</div>
        ) : (
          <DataTable
            columns={sessionColumns}
            data={sessionsQuery.data?.items ?? []}
            entityPath="session/"
            pagination={{
              pageIndex: sessionsPageIndex,
              pageSize: sessionsPageSize,
              setPageIndex: setSessionsPageIndex,
              setPageSize: setSessionsPageSize,
            }}
            pageCount={Math.ceil((sessionsQuery.data?.totalCount ?? 0) / sessionsPageSize)}
          />
        )}
      </div>
      <div className="w-3/4 h-30vh min-h-1/2 ml-auto ">{renderComponent()}</div>
    </>
  )
}

function renderComponent() {
  return <div>Henlo</div>
}
