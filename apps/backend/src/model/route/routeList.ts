import config from '../../core/config'
import { ClimbingStructureType, ApprovalState } from '@prisma/client'
import {
  IncommingListParams,
  NonNullListParams,
  parseApprovalStates,
  parseArray,
  toNotNullListParams,
  toNumber,
  validateListParams,
} from '../common/listParams'
import { GradeDetail, gradeDetailSelector, GradeList, gradeListSelector } from '../grade'
import { RouteOrder } from '../../repositories/route.repository'
import { RefObject, refObjectSelector } from '../common/refObject'

type RouteList = {
  id: string
  name: string
  description: string
  grade: GradeDetail
  climbingStructureType: ClimbingStructureType
  averageStar: number
  userGradeRating: GradeList
  longitude: number
  latitude: number
  image: RefObject | null
  approvalState: ApprovalState
}

const selector = {
  id: true,
  name: true,
  description: true,
  grade: {
    select: gradeDetailSelector,
  },
  climbingStructureType: true,
  averageStar: true,
  userGradeRating: {
    select: gradeListSelector,
  },
  longitude: true,
  latitude: true,
  image: {
    select: refObjectSelector,
  },
  approvalState: true,
}

type IncommingRouteListParams = {
  name: string | null
  ratingFrom: number | null
  ratingTo: number | null
  longitudeFrom: number | null
  longitudeTo: number | null
  latitudeFrom: number | null
  latitudeTo: number | null
  climbingStructureTypes: string | null
  approvalStates: string | null
} & IncommingListParams

type NonNullRouteListParams = {
  name: string
  ratingFrom: number
  ratingTo: number
  longitudeFrom: number
  longitudeTo: number
  latitudeFrom: number
  latitudeTo: number
  climbingStructureTypes: ClimbingStructureType[]
  approvalStates: ApprovalState[]
} & NonNullListParams

const validSortFields = ['name', 'rating']

const validateRouteListParams = (params: NonNullRouteListParams) => {
  validateListParams(params, validSortFields)
}

const parseClimbingStructureTypes = (climbingStructureTypes: string | null) => {
  const types = parseArray(climbingStructureTypes).map((value) => {
    if (Object.values(ClimbingStructureType).includes(value as ClimbingStructureType)) {
      return value as ClimbingStructureType
    } else {
      throw new Error(`Invalid climbing structure type: ${value}`)
    }
  })

  // all types if none are provided
  return types.length > 0 ? types : Object.values(ClimbingStructureType)
}

const defaultRouteListParams = (params: IncommingRouteListParams): NonNullRouteListParams => {
  const {
    name,
    ratingFrom,
    ratingTo,
    longitudeFrom,
    longitudeTo,
    latitudeFrom,
    latitudeTo,
    climbingStructureTypes,
    approvalStates,
    ...listParams
  } = params
  return {
    name: name || '',
    ratingFrom: toNumber(ratingFrom, 0),
    ratingTo: toNumber(ratingTo, 69696969),
    longitudeFrom: toNumber(longitudeFrom, -180),
    longitudeTo: toNumber(longitudeTo, 180),
    latitudeFrom: toNumber(latitudeFrom, -90),
    latitudeTo: toNumber(latitudeTo, 90),
    climbingStructureTypes: parseClimbingStructureTypes(climbingStructureTypes),
    approvalStates: parseApprovalStates(approvalStates),
    ...toNotNullListParams(listParams, config.LIST_LIMIT.ROUTE),
  }
}

const getOrderBy = (sortFields: string[], orderDirections: string[]): RouteOrder[] => {
  return sortFields.map((field, index) => {
    const direction = orderDirections[index]?.toLowerCase() === 'desc' ? 'desc' : 'asc'

    switch (field) {
      case 'rating':
        return { grade: { rating: direction } }
      case 'name':
        return { name: direction }
      default:
        return { [field]: direction }
    }
  })
}

export type { RouteList, IncommingRouteListParams, NonNullRouteListParams }
export {
  selector,
  defaultRouteListParams,
  validateRouteListParams,
  getOrderBy,
  parseClimbingStructureTypes,
}
