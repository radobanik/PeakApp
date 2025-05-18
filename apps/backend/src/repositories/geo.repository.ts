import { GeoCountry, geoCountrySelector } from '../model/geo/geoCountry'
import { GeoCity, geoCitySelector } from '../model/geo/geoCity'
import { GeoCityWithCountry, geoCityWithCountrySelector } from '../model/geo/geoCityWithCountry'
import prisma from '../core/prisma/client'

const getAllCountries = async (): Promise<GeoCountry[]> => {
  return await prisma.country.findMany({
    select: geoCountrySelector,
  })
}

const getCitiesByCountry = async (countryId: string): Promise<GeoCity[]> => {
  return await prisma.city.findMany({
    where: { countryId },
    select: geoCitySelector,
  })
}

const getCityById = async (cityId: string): Promise<GeoCityWithCountry | null> => {
  return await prisma.city.findUnique({
    where: { id: cityId },
    select: geoCityWithCountrySelector,
  })
}

export default {
  getAllCountries,
  getCitiesByCountry,
  getCityById,
}
