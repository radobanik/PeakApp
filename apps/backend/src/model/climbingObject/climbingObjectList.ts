import { ApprovalState, ClimbingStructureType } from '@prisma/client'
import { RouteWhere } from '../../repositories/route.repository'
import {
  parseApprovalStates,
  IncommingListParams,
  NonNullListParams,
  toNotNullListParams,
  toNumber,
  validateListParams,
} from '../common/listParams'
import { parseClimbingStructureTypes } from '../route'

type ClimbingObjectList = {
  id: string
  name: string
  longitude: number
  latitude: number
  routeCount: number
  approvalState: ApprovalState
}

type ClimbingObjectListQueryOutput = {
  id: string
  name: string
  longitude: number
  latitude: number
  _count: {
    routes: number
  }
  approvalState: ApprovalState
}

const selector = (routeWhere: RouteWhere) => ({
  id: true,
  name: true,
  longitude: true,
  latitude: true,
  _count: {
    select: {
      routes: {
        where: routeWhere,
      },
    },
  },
  approvalState: true,
})

type IncommingClimbingObjectListParams = {
  name: string | null
  routeName: string | null
  ratingFrom: number | null
  ratingTo: number | null
  latitudeFrom: number | null
  latitudeTo: number | null
  longitudeFrom: number | null
  longitudeTo: number | null
  climbingStructureTypes: string | null
  approvalStates: string | null
} & IncommingListParams

type NonNullClimbingObjectListParams = {
  name: string
  routeName: string
  ratingFrom: number
  ratingTo: number
  latitudeFrom: number
  latitudeTo: number
  longitudeFrom: number
  longitudeTo: number
  climbingStructureTypes: ClimbingStructureType[]
  approvalStates: ApprovalState[]
} & NonNullListParams

const validSortFields = ['name']

const validateClimbingObjectListParams = (params: NonNullClimbingObjectListParams) => {
  validateListParams(params, validSortFields)
}

const defaultClimbingObjectListParams = (
  params: IncommingClimbingObjectListParams
): NonNullClimbingObjectListParams => {
  const {
    name,
    routeName,
    ratingFrom,
    ratingTo,
    longitudeFrom,
    longitudeTo,
    latitudeFrom,
    latitudeTo,
    climbingStructureTypes,
    ...listParams
  } = params

  return {
    name: name || '',
    routeName: routeName || '',
    ratingFrom: toNumber(ratingFrom, 0),
    ratingTo: toNumber(ratingTo, 10000000),
    latitudeFrom: toNumber(latitudeFrom, -90),
    latitudeTo: toNumber(latitudeTo, 90),
    longitudeFrom: toNumber(longitudeFrom, -180),
    longitudeTo: toNumber(longitudeTo, 180),
    climbingStructureTypes: parseClimbingStructureTypes(climbingStructureTypes),
    approvalStates: parseApprovalStates(params.approvalStates),
    ...toNotNullListParams(listParams, 10000000000),
  }
}

const toClimbingObjectList = (
  climbingObject: ClimbingObjectListQueryOutput
): ClimbingObjectList => {
  return {
    id: climbingObject.id,
    name: climbingObject.name,
    longitude: climbingObject.longitude,
    latitude: climbingObject.latitude,
    routeCount: climbingObject._count.routes,
    approvalState: climbingObject.approvalState,
  }
}

export type {
  ClimbingObjectList,
  ClimbingObjectListQueryOutput,
  IncommingClimbingObjectListParams,
  NonNullClimbingObjectListParams,
}
export {
  selector,
  toClimbingObjectList,
  defaultClimbingObjectListParams,
  validateClimbingObjectListParams,
}
