import LoadingSpinner from '@/components/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getClimbingObjects } from '@/services/climbingObjectService'
import { getRoutes } from '@/services/routeService'
import { getUsers } from '@/services/userService'
import { useQuery } from '@tanstack/react-query'

export default function Analytics() {
  const objectsQuery = useQuery({
    queryKey: ['analytics-objects'],
    queryFn: () => getClimbingObjects(),
    select: (data) => data.length,
  })
  const routeQuery = useQuery({
    queryKey: ['analytics-routes'],
    queryFn: () => getRoutes(),
    select: (data) => data.total,
  })
  const usersQuery = useQuery({
    queryKey: ['analytics-users'],
    queryFn: () => getUsers(),
    select: (data) => data.total,
  })
  const isAnyLoading = objectsQuery.isLoading || routeQuery.isLoading || usersQuery.isLoading
  const isAnyError = objectsQuery.isError || routeQuery.isError || usersQuery.isError
  const isSuccess = objectsQuery.isSuccess && routeQuery.isSuccess && usersQuery.isSuccess
  return (
    <div className="flex-1 pt-2">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>
          {isAnyLoading && !isAnyError && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          {isAnyError && (
            <div className="flex justify-center">
              <span>Could not load the data</span>
            </div>
          )}
          {isSuccess && (
            <>
              <p className="text-md">Total number of climbing objects:</p>
              <p className="text-stone-500 mb-2">{objectsQuery.data}</p>
              <p className="text-md">Total number of routes:</p>
              <p className="text-stone-500 mb-2">{routeQuery.data}</p>
              <p className="text-md">Total number of users:</p>
              <p className="text-stone-500">{usersQuery.data}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
