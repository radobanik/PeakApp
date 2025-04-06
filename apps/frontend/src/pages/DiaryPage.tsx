import HeaderBar from '@/components/HeaderBar'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { useEffect, useState } from 'react'
import { getActivities } from '@/services/activityService'
import { getSessions } from '@/services/sessionService'
import { Activity } from '@/types/activityTypes'
import { Session } from '@/types/sessionTypes'

import toppedIcon from '../assets/toppedIcon.png'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type activityEntry = {
  id: string
  climbedAt: Date
  routeName: string
  routeGrade: string
  routeType: string
  numOfAttempts: number
  topped: boolean
}

type SessionEntry = {
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
  const [activityData, setActivityData] = useState<activityEntry[]>([])
  const [sessionEntries, setSessionEntries] = useState<SessionEntry[]>([])
  const [selectedActivity, setSelectedActivity] = useState<activityEntry | null>(null)
  const [selectedSession, setSelectedSession] = useState<SessionEntry | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      const activities: Activity[] = (await getActivities()).items as Activity[]
      const entries: activityEntry[] = activities.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
      }))
      setActivityData(entries)
    }

    const fetchSessions = async () => {
      const sessions: Session[] = (await getSessions()).items as Session[]
      const sessionEntries: SessionEntry[] = sessions.map((session) => ({
        id: session.id,
        createdAt: session.createdAt,
        note: session.note,
        numberOfActivities: session.assignedActivities.length,
      }))
      setSessionEntries(sessionEntries)
    }
    if (!isLoaded) {
      setIsLoaded(true)
      localStorage.removeItem('selectedActivity')
      localStorage.removeItem('selectedSession')
    }
    fetchActivities()
    fetchSessions()
  }, [])

  useEffect(() => {
    if (selectedActivity) {
      localStorage.removeItem('selectedSession')
      localStorage.setItem('selectedActivity', selectedActivity.id)
    }
  }, [selectedActivity])

  useEffect(() => {
    if (selectedSession) {
      localStorage.removeItem('selectedActivity')
      localStorage.setItem('selectedSession', selectedSession.id)
    }
  }, [selectedSession])

  return (
    <main>
      <HeaderBar />
      <div className="flex flex-col gap-4 p-4 w-3/4 ml-auto h-45vh border-1 bg-stone-800">
        <h3 className="text-2xl font-bold bg-">Unassigned Activities</h3>
        <DataTable columns={activityColumns} data={activityData} setter={setSelectedActivity} />
        <h3 className="text-2xl font-bold">My Sessions</h3>
        <DataTable columns={sessionColumns} data={sessionEntries} setter={setSelectedSession} />
      </div>
      <div className="w-3/4 h-30vh min-h-1/2 ml-auto ">{renderComponent()}</div>
    </main>
  )
}

function renderComponent() {
  const selectedActivity = localStorage.getItem('selectedActivity')
  const selectedSession = localStorage.getItem('selectedSession')

  if (selectedActivity) {
    return activityDetail(localStorage.getItem('selectedActivity')!)
  } else if (selectedSession) {
    return sessionDetail(localStorage.getItem('selectedSession')!)
  } else {
    return noDetail()
  }
}

function noDetail() {
  return <div className="p-2 text-2xl">Select an activity or session to view details</div>
}

function activityDetail(id: string) {
  return (
    <div className="flex flex-row ">
      <div className="border-1 flex-3/4">
        <div className="p-4">
          <Label className="text-bold text-2xl">Percieved Difficulty</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Diffficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="ultraHard">Ultra Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="p-4">
          <Label className="text-bold text-2xl">Number of Attempts</Label>
          <Input type="number" id="nomOfAttempts" placeholder="Enter Number" className="w-40" />
        </div>
        <div className="p-4">
          <Label htmlFor="note" className="text-bold text-2xl">
            Note
          </Label>
          <Input
            type="text"
            id="note"
            placeholder="Write your notes to this activity here..."
            className="h-40"
          />
        </div>
      </div>
      <div className="border-1 flex-1/4 flex flex-col justify-between">
        <div>
          <p className="text-1xl text-blue-500 text-bold bg-stone-800 rounded p-2 m-4">date</p>
        </div>
        <div className="flex flex-col justify-end items-center">
          <div className="flex flex-row">
            <Label htmlFor="topped" className="text-bold text-2xl px-4 py-2">
              Topped
            </Label>
            <Input type="checkbox" id="topped" placeholder="Date" className="w-5 m-4" />
          </div>
          <Button
            className="font-bold py-2 px-4 rounded items-end justify-end w-100 h-10"
            variant="outline"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

function sessionDetail(id: string) {
  return <div>sessionDetail for session {id} </div>
}
