import { ROUTE } from '@/constants/routes'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getNewRoutes } from '@/services/backofficeService'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Outlet, useMatch } from 'react-router-dom'
import { cn } from '@/lib/utils'
import NewRouteEntry from '@/components/backoffice/NewRouteEntry'
import { useState } from 'react'
import Pagination from '@/components/PaginationComponent'
import { useApprovalContext } from '@/components/backoffice/ApprovalProvider'

export default function ReviewRoutesPage() {
  const isDetail = useMatch(ROUTE.NEW_ROUTES_DETAIL)
  const { approvedMap } = useApprovalContext()
  const [page, setPage] = useState(1)

  const newRoutesQuery = useQuery({
    queryKey: ['new_routes', page],
    queryFn: async () => await getNewRoutes(page),
  })

  return (
    <div className="flex flex-row flex-1 overflow-auto">
      <div className={cn('flex flex-col flex-1 min-w-0', isDetail ? 'hidden sm:flex' : '')}>
        <div className="flex flex-1 overflow-hidden">
          {newRoutesQuery.isLoading && (
            <div className="flex flex-1 justify-center">
              <LoadingSpinner />
            </div>
          )}
          {newRoutesQuery.isError && <div>Error: {newRoutesQuery.error.message}</div>}
          {newRoutesQuery.isSuccess && (
            <div className="flex-1 overflow-auto p-1 pr-4">
              {newRoutesQuery.data.items.length === 0 && (
                <div className="flex justify-center p-4">No new routes available</div>
              )}
              {newRoutesQuery.data.items.map((entry) => (
                <NewRouteEntry
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
          totalPages={Math.max(newRoutesQuery.data?.totalPages ?? 0, 1)}
          setPage={setPage}
        />
      </div>

      {isDetail && (
        <div className="flex-1 max-w-[640px] h-full p-2">
          <div className="flex-1 max-w-[640px] h-full border border-gray-200 rounded-md p-2">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}
