import { useQuery } from '@tanstack/react-query'
import { getSearchSuggestionsByToken } from '../../services/searchService'

export const useSearchSuggestions = (token: string) => {
  return useQuery({
    queryKey: ['search-suggestions', token],
    queryFn: () => getSearchSuggestionsByToken(token),
    enabled: !!token && token.length > 1,
    staleTime: 60 * 1000,
  })
}
