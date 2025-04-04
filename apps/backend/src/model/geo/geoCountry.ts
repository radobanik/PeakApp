type GeoCountry = {
  id: string
  name: string
}

const geoCountrySelector = {
  id: true,
  name: true,
}

export type { GeoCountry }
export { geoCountrySelector }
