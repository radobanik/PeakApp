import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

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
    const { country: countryName, iso2, cities } = country

    const createdCountry = await prisma.country.upsert({
      where: { code: iso2 },
      update: { name: countryName },
      create: { name: countryName, code: iso2, long: 0, lat: 0 },
    })

    console.log(`Upserted country: ${createdCountry.name}`)

    if (Array.isArray(cities)) {
      for (const cityName of cities) {
        await prisma.city.create({
          data: {
            name: cityName,
            countryId: createdCountry.id,
            long: 0,
            lat: 0,
          },
        })
      }
    }
  }
}

export default initGeoData
