import { useCallback } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { TableList } from '../../components/backoffice/TableList'
import { UserList } from '@/types/userTypes'
import { getUsers } from '@/services/userService'
import { Outlet, useMatch } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { cn } from '@/lib/utils'

const columns: ColumnDef<UserList>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  { accessorKey: 'userName', header: 'Username' },
  { accessorKey: 'email', header: 'Email' },
]

export default function AllUserList() {
  const isDetail = useMatch(ROUTE.ALL_USERS_DETAIL)
  const useTableQuery = useCallback((page: number, pageSize: number) => {
    return useQuery({
      queryKey: ['all_users', page, pageSize],
      queryFn: () => getUsers(page, pageSize),
    })
  }, [])
  return (
    <div className="flex justify-center space-x-4 h-full w-full">
      <div className={cn('flex-1 h-full', isDetail ? 'hidden sm:flex' : '')}>
        <TableList
          queryToUse={useTableQuery}
          columnDefiniton={columns}
          parentRoute={ROUTE.ALL_USERS}
          noResult={<div className="text-center">No users found</div>}
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
