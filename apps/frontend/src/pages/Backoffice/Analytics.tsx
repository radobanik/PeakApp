import LoadingSpinner from '@/components/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { getFilteredClimbingObject } from '@/services/climbingObjectService'
import { getRoutes } from '@/services/routeService'
import { getUsers } from '@/services/userService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { updateFeatureFlag } from '@/services/featureFlagsService'
import { useFeatureFlagsQuery } from '@/services/queryHooks'
import { toast } from 'sonner'

export default function Analytics() {
  const objectsQuery = useQuery({
    queryKey: ['analytics-objects'],
    queryFn: () => getFilteredClimbingObject(null),
    select: (data) => data.items.length,
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

  const queryClient = useQueryClient()
  const featureFlagsQuery = useFeatureFlagsQuery()

  const updateFeatureFlagMutation = useMutation({
    mutationFn: updateFeatureFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] })
      toast.success('Feature flag updated successfully')
    },
    onError: () => {
      toast.error('Failed to update feature flag')
    },
  })

  return (
    <div className="flex flex-col gap-4 pt-2">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Climbing Objects</span>
                  <span className="text-sm text-muted-foreground">
                    Total number of climbing objects in the system
                  </span>
                </div>
                <span className="font-medium">{objectsQuery.data}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Routes</span>
                  <span className="text-sm text-muted-foreground">
                    Total number of routes in the system
                  </span>
                </div>
                <span className="font-medium">{routeQuery.data}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Users</span>
                  <span className="text-sm text-muted-foreground">
                    Total number of registered users
                  </span>
                </div>
                <span className="font-medium">{usersQuery.data}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
        </CardHeader>
        <CardContent>
          {featureFlagsQuery.isLoading && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          {featureFlagsQuery.isError && (
            <div className="flex justify-center">
              <span>Could not load feature flags</span>
            </div>
          )}
          {featureFlagsQuery.data && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Comments Enabled</span>
                  <span className="text-sm text-muted-foreground">
                    Enable/disable comments functionality across the app
                  </span>
                </div>
                <Switch
                  checked={featureFlagsQuery.data.commentsEnabled}
                  onCheckedChange={(enabled) =>
                    updateFeatureFlagMutation.mutate({
                      name: 'commentsEnabled',
                      enabled,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Show Approved Only</span>
                  <span className="text-sm text-muted-foreground">
                    Show only approved content to regular users
                  </span>
                </div>
                <Switch
                  checked={featureFlagsQuery.data.showApprovedOnly}
                  onCheckedChange={(enabled) =>
                    updateFeatureFlagMutation.mutate({
                      name: 'showApprovedOnly',
                      enabled,
                    })
                  }
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
