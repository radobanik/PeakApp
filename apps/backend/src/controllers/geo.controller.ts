import { Request, Response } from 'express'
import { HTTP_STATUS } from './utils/httpStatusCodes'
import GeoRepository from '../repositories/geo.repository'
import { GeoCountry } from '../model/geo/geoCountry'
import { GeoCity } from '../model/geo/geoCity'
import { GeoCityWithCountry } from '../model/geo/geoCityWithCountry'

type CountryIdParams = {
  countryId: string
}

type CityIdParams = {
  cityId: string
}

const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries: GeoCountry[] = await GeoRepository.getAllCountries()
    const response = countries.map((country) => ({
      id: country.id,
      name: country.name,
    }))
    res.status(HTTP_STATUS.OK_200).json(response)
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
      error: 'Failed to fetch countries',
    })
  }
}

const getCitiesByCountry = async (req: Request<CountryIdParams>, res: Response): Promise<void> => {
  const { countryId } = req.params

  if (!countryId) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({
      error: 'Country ID is required',
    })
    return
  }

  try {
    const cities: GeoCity[] = await GeoRepository.getCitiesByCountry(countryId)
    const response = cities.map((city) => ({
      id: city.id,
      name: city.name,
    }))
    res.status(HTTP_STATUS.OK_200).json(response)
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
      error: 'Failed to fetch cities for the specified country',
    })
  }
}

const getCityById = async (req: Request<CityIdParams>, res: Response): Promise<void> => {
  const { cityId } = req.params

  if (!cityId) {
    res.status(HTTP_STATUS.BAD_REQUEST_400).json({
      error: 'City ID is required',
    })
    return
  }

  try {
    const city: GeoCityWithCountry | null = await GeoRepository.getCityById(cityId)

    if (!city) {
      res.status(HTTP_STATUS.NOT_FOUND_404).json({
        error: 'City not found',
      })
      return
    }

    const response = {
      id: city.id,
      name: city.name,
    }
    res.status(HTTP_STATUS.OK_200).json(response)
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
      error: 'Failed to fetch the city',
    })
  }
}

export default {
  getAllCountries,
  getCitiesByCountry,
  getCityById,
}
