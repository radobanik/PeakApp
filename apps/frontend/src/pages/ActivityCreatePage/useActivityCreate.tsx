import { getRouteById } from '@/services/routeService'
import { useQuery } from '@tanstack/react-query'

export const getRoute = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () => getRouteById(id),
  })
}
