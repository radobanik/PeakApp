import { ROUTE } from '@/constants/routes'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getNewObjects } from '@/services/backofficeService'
import LoadingSpinner from '@/components/LoadingSpinner'
import NewObjectEntry from '@/components/backoffice/NewObjectEntry'
import { Outlet, useMatch } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'
import Pagination from '@/components/PaginationComponent'

export default function ReviewObjectsPage() {
  const isDetail = useMatch(ROUTE.NEW_CLIMBING_OBJECTS_DETAIL)
  const { approvedMap } = useApprovalContext()
  const [page, setPage] = useState(1)

  const query = useQuery({
    queryKey: ['new_objects', page],
    queryFn: async () => getNewObjects(page),
  })

  return (
    <div className="flex flex-row flex-1 w-full overflow-auto pb-2">
      <div className={cn('flex flex-col flex-1 min-w-0', isDetail ? 'hidden sm:flex' : '')}>
        <div className="flex flex-1 overflow-hidden">
          {query.isLoading && (
            <div className="flex flex-1 justify-center">
              <LoadingSpinner />
            </div>
          )}
          {query.isError && <div>Error: {query.error.message}</div>}
          {query.isSuccess && (
            <div className="flex-1 overflow-auto p-2 pt-4 pr-4">
              {query.data.total === 0 && (
                <div className="flex justify-center p-4">No new objects available</div>
              )}
              {query.data.items.map((entry) => (
                <NewObjectEntry
                  key={entry.id}
                  {...entry}
                  approveState={approvedMap.get(entry.id) ?? null}
                />
              ))}
            </div>
          )}
        </div>
        <Separator className="mt-2" />
        <Pagination
          page={page}
          totalPages={Math.max(query.data?.totalPages ?? 0, 1)}
          setPage={setPage}
        />
      </div>
      {isDetail && (
        <div
          className={cn(
            ' flex-1 max-w-[500px] min-w-[300px] mt-4',
            'sm:rounded-md sm:border sm:p-2'
          )}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-1 w-full overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
