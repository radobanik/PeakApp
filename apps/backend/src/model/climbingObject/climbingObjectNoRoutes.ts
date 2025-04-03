type ClimbingObjectNoRoutes = {
  id: string
  name: string
  longitude: number
  latitude: number
}

const selector = {
  id: true,
  name: true,
  longitude: true,
  latitude: true,
}

export type { ClimbingObjectNoRoutes }
export { selector }
