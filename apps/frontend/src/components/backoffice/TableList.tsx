import { JSX, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
} from 'lucide-react'
import { UseQueryResult } from '@tanstack/react-query'
import { PaginatedResponse } from '@/types'
import { useNavigate } from 'react-router-dom'

// Extend the ColumnMeta interface to include className
// ESLint exceptionn is needed as TS is shit
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string
  }
}

type TableListProps<T> = {
  queryToUse: (page: number, pageSize: number) => UseQueryResult<PaginatedResponse<T>>
  columnDefiniton: ColumnDef<T>[]
  parentRoute: string
  noResult: JSX.Element
}

export const TableList = <T,>(props: TableListProps<T>): JSX.Element => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 })
  const navigate = useNavigate()

  const query = props.queryToUse(pagination.pageIndex + 1, pagination.pageSize)
  const table = useReactTable({
    data: query.data?.items ?? [],
    columns: props.columnDefiniton,
    manualPagination: true,
    pageCount: Math.floor((query.data?.total ?? 0) / pagination.pageSize) + 1,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnVisibility,
      pagination,
    },
    meta: {
      className: '',
    },
  })
  return (
    <div className="flex flex-col w-full pt-4 h-full min-h-[300px]">
      <div className="rounded-md border flex flex-col w-full mx-auto space-y-6 p-4 h-full min-h-[300px]">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon className="h-4 w-4 mr-2" />
                Customize Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 overflow-auto">
          <Table className="relative">
            <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {query.isLoading && (
                <TableRow>
                  <TableCell colSpan={props.columnDefiniton.length} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {query.isError && (
                <TableRow>
                  <TableCell colSpan={props.columnDefiniton.length} className="text-center py-10">
                    <div className="text-center">{query.error.message}</div>
                  </TableCell>
                </TableRow>
              )}
              {query.isSuccess && (
                <>
                  {query.data.items.length > 0 &&
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => navigate(`${props.parentRoute}/${row.id}`)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cell.column.columnDef.meta?.className}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  {query.data.items.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={props.columnDefiniton.length}
                        className="text-center py-10"
                      >
                        {props.noResult}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
