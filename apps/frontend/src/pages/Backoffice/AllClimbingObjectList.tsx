import { useCallback } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ClimbingObjectList } from '@/types/climbingObjectTypes'
import { useQuery } from '@tanstack/react-query'
import { getClimbingObjects } from '@/services/climbingObjectService'
import { TableList } from '../../components/backoffice/TableList'
import { Outlet, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { cn } from '@/lib/utils'

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
  const useTableQuery = useCallback((page: number, pageSize: number) => {
    return useQuery({
      queryKey: ['all_objects', page, pageSize],
      queryFn: async () => getClimbingObjects(),
      select: (data) => ({
        items: data.slice((page - 1) * pageSize, page * pageSize),
        total: data.length,
        page: page,
        pageSize: pageSize,
      }),
    })
  }, [])
  return (
    <div className="flex justify-center space-x-4 h-full w-full">
      <div className={cn('flex-1 h-full', isDetail ? 'hidden sm:flex' : '')}>
        <TableList
          queryToUse={useTableQuery}
          columnDefiniton={columns}
          parentRoute={ROUTE.ALL_CLIMBING_OBJECTS}
          noResult={<div className="text-center">No climbing objects found</div>}
        />
      </div>
      {isDetail && (
        <div className="rounded-md border flex-1 max-w-[500px] mt-4">
          <Outlet />
        </div>
      )}
    </div>
  )
}
