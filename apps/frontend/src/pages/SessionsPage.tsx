import ScrollTable from '@/components/ScrollTable'
import SessionTableEntry from '@/components/SessionTableEntry'
import { ROUTE } from '@/constants/routes'

import BackButton from '@/components/BackButton'
import plusIcon from '@/assets/Plus.svg'
import { Link } from 'react-router-dom'
import { useSessionsQuery } from '@/services/queryHooks'

export default function SessionsPage() {
  const sessionsQuery = useSessionsQuery()

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-between p-4 gap-4">
        <div className="flex flex-row items-center gap-4">
          <BackButton backRoute={ROUTE.DIARY} />
          <h1 className="text-2xl">My Sessions</h1>
        </div>
        <Link to={ROUTE.SESSIONS_NEW}>
          <img src={plusIcon} alt="Add Activity" className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-1 overflow-hidden p-4 lg:w-[50%] lg:mx-auto md:w-[70%] md:mx-auto">
        {sessionsQuery.isLoading && <div>Loading...</div>}
        {sessionsQuery.isError && <div>Error: {sessionsQuery.error.message}</div>}
        {sessionsQuery.isSuccess && (
          <div className="flex-1 overflow-auto lg:justify-center">
            <ScrollTable
              entries={sessionsQuery.data.items}
              Component={SessionTableEntry}
              backRoute={ROUTE.SESSIONS}
            />
          </div>
        )}
      </div>
    </div>
  )
}
