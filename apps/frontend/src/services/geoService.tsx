import { API } from '@/constants/api'
import { CitiesResponse, CountriesResponse } from '@/types/geoTypes'
import { api } from './index'

export async function getCountries(): Promise<CountriesResponse> {
  try {
    const response = await api.get<CountriesResponse>(API.GEO.COUNTRIES)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch countries.'
    throw new Error(message)
  }
}

export async function getCitiesByCountry(countryId: string): Promise<CitiesResponse> {
  try {
    const response = await api.get<CitiesResponse>(`${API.GEO.COUNTRIES}/${countryId}/cities`)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch cities.'
    throw new Error(message)
  }
}
