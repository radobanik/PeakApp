type GeoCityWithCountry = {
  id: string
  name: string
  long: number | null
  lat: number | null
  country: {
    id: string
    name: string
    code: string
  }
}

const geoCityWithCountrySelector = {
  id: true,
  name: true,
  long: true,
  lat: true,
  country: {
    select: {
      id: true,
      name: true,
      code: true,
    },
  },
}

export type { GeoCityWithCountry }
export { geoCityWithCountrySelector }
