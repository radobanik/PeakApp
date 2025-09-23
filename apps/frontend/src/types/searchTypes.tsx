import { ClimbingObjectList } from './climbingObjectTypes'
import { RouteSummary } from './routeTypes'

export interface SearchSuggestions {
  climbingObjects: ClimbingObjectList[]
  routes: RouteSummary[]
}
