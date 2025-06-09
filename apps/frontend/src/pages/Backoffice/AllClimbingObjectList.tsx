import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ClimbingObjectList } from '@/types/climbingObjectTypes'
import { useQuery } from '@tanstack/react-query'
import { getFilteredClimbingObject } from '@/services/climbingObjectService'
import { TableList } from '../../components/backoffice/TableList'
import { Link, Outlet, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

// Extend the ColumnMeta interface to include className
// ESLint exceptionn is needed as TS is shit
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string
  }
}

const columns: ColumnDef<ClimbingObjectList>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'routeCount', header: 'Number of routes' },
  {
    id: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const longitude = row.original.longitude.toFixed(2)
      const latitude = row.original.latitude.toFixed(2)
      return (
        <span>
          {longitude}, {latitude}
        </span>
      )
    },
  },
]

export default function AllClimbingObjectList() {
  const isDetail = useMatch(ROUTE.ALL_CLIMBING_OBJECTS_DETAIL)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })
  const objectsQuery = useQuery({
    queryKey: ['all_objects', pagination.pageIndex, pagination.pageSize],

    queryFn: async () => getFilteredClimbingObject(null),
    select: (data) => ({
      items: data.items.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
      ),
      total: data.items.length,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    }),
  })
  return (
    <div className="flex justify-center space-x-4 h-full w-full">
      <div className={cn('flex-1 h-full', isDetail ? 'hidden sm:flex' : '')}>
        <TableList
          data={objectsQuery.data}
          isLoading={objectsQuery.isLoading}
          isError={objectsQuery.isError}
          error={objectsQuery.error}
          isSuccess={objectsQuery.isSuccess}
          pagination={pagination}
          setPagination={setPagination}
          columnDefiniton={columns}
          parentRoute={ROUTE.ALL_CLIMBING_OBJECTS}
          noResult={<div className="text-center">No climbing objects found</div>}
        />
      </div>
      {isDetail && (
        <div className="rounded-md border flex-1 max-w-[500px] min-w-[300px] mt-4 p-2">
          <div className="flex flex-col w-full h-full p-2">
            <div className="flex justify-end">
              <Link to={ROUTE.ALL_CLIMBING_OBJECTS}>
                <X className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex flex-1 w-full overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
