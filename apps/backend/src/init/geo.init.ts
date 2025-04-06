import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import { Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const DATA_PATH = path.join(__dirname, '../../prisma/data/country.json')

async function initGeoData() {
  const fileContent = fs.readFileSync(DATA_PATH, 'utf-8')
  const data = JSON.parse(fileContent)

  if (!data || !data.data) {
    console.error('Invalid data format in country.json')
    return
  }

  const countries = data.data

  for (const country of countries) {
    const { country: countryName, iso2, cities, longitude, latitude } = country

    const createdCountry = await prisma.country.upsert({
      where: { code: iso2 },
      update: { name: countryName, long: Number(longitude), lat: Number(latitude) },
      create: { name: countryName, code: iso2, long: Number(longitude), lat: Number(latitude) },
    })

    if (Array.isArray(cities)) {
      const citiesCreate: Prisma.CityCreateManyInput[] = cities.map((cityName) => ({
        name: cityName,
        countryId: createdCountry.id,
      }))

      await prisma.city.createMany({
        data: citiesCreate,
        skipDuplicates: true,
      })
    }
  }
}

export default initGeoData
