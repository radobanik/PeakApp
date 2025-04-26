import HeaderBar from '@/components/HeaderBar'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { useState } from 'react'
import { getActivities, getActivityById } from '@/services/activityService'
import { getSessionById, getSessions } from '@/services/sessionService'
import { useQuery } from '@tanstack/react-query'

import toppedIcon from '../assets/toppedIcon.png'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import { ClimbingStructureType } from '@/types/routeTypes'
import ScrollTable from '@/components/ScrollTable'

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

export default function ActivitiesPage() {
  const activitiesQuery = useQuery({
    queryKey: ['activities'],
    queryFn: async () => getActivities(),
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

  return (
    <main className="flex flex-col h-screen">
      <HeaderBar />
      <div className="flex flex-1 overflow-hidden">
        {activitiesQuery.isLoading && <div>Loading...</div>}
        {activitiesQuery.isError && <div>Error: {activitiesQuery.error.message}</div>}
        {activitiesQuery.isSuccess && (
          <div className="flex-1 overflow-auto">
            <ScrollTable activities={activitiesQuery.data.items} />
          </div>
          // <ActivityTableEntry activity={activitiesQuery.data!.items[0]} />
        )}
      </div>
    </main>
  )
}

function renderComponent() {
  return <div>Henlo</div>
}
