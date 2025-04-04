type GeoCity = {
  id: string
  name: string
  long: number | null
  lat: number | null
}

const geoCitySelector = {
  id: true,
  name: true,
  long: true,
  lat: true,
}

export type { GeoCity }
export { geoCitySelector }
