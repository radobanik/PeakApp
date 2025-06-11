import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { TableList } from '../../components/backoffice/TableList'
import { UserList } from '@/types/userTypes'
import { getUsers } from '@/services/userService'
import { Link, Outlet, useMatch, useParams } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { X } from 'lucide-react'

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
  const { id } = useParams()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })
  const usersQuery = useQuery({
    queryKey: ['all_users', pagination.pageIndex, pagination.pageSize],
    queryFn: () => getUsers(pagination.pageIndex + 1, pagination.pageSize),
  })
  // console.log(usersQuery.data)
  return (
    <div className="flex space-x-4 h-full w-full">
      <div className={cn('flex-1 min-w-0 h-full', isDetail ? 'hidden sm:flex' : '')}>
        <TableList
          data={usersQuery.data}
          isLoading={usersQuery.isLoading}
          isError={usersQuery.isError}
          error={usersQuery.error}
          isSuccess={usersQuery.isSuccess}
          pagination={pagination}
          setPagination={setPagination}
          columnDefiniton={columns}
          initialColumnVisibility={{ email: false }}
          parentRoute={ROUTE.ALL_USERS}
          noResult={<div className="text-center">No users found</div>}
        />
      </div>
      {isDetail && (
        <div className={cn(' flex-1 max-w-[500px] min-w-[300px] mt-4', 'sm:rounded-md sm:border')}>
          <div className="flex flex-col w-full h-full">
            <div className="flex justify-end">
              <Link to={ROUTE.ALL_USERS}>
                <X className="w-6 h-6 mt-2 mr-2" />
              </Link>
            </div>
            <div id={id} className="flex flex-1 w-full overflow-auto p-4 mb-4 pt-0">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
