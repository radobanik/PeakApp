import { API } from '@/constants/api'
import { api } from '.'
import { SearchSuggestions } from '@/types/searchTypes'

export async function getSearchSuggestionsByToken(token: string): Promise<SearchSuggestions> {
  const response = await api.get(API.SEARCH.BY_TOKEN(), {
    params: { token },
  })
  console.log(response.data)
  return response.data
}
