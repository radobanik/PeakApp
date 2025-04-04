import { PrismaClient } from '@prisma/client'
import * as UserInit from './user.init'
import * as RouteInit from './route.init'

const prisma = new PrismaClient()

// Climbing Object IDs
export const CLIMBING_OBJECT_1_ID = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
export const CLIMBING_OBJECT_2_ID = 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'
export const CLIMBING_OBJECT_3_ID = 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f'
export const CLIMBING_OBJECT_4_ID = 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8g'
export const CLIMBING_OBJECT_5_ID = 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8g9h'
export const CLIMBING_OBJECT_6_ID = 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8g9h0i'

const climbingObjects = [
  // Main Wall - coordinates from RouteInit.ROUTE_1_ID
  {
    id: CLIMBING_OBJECT_1_ID,
    name: 'Main Wall',
    longitude: 16.607885,
    latitude: 49.206331,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
  },
  // Sunset Crag - coordinates from RouteInit.ROUTE_8_ID
  {
    id: CLIMBING_OBJECT_2_ID,
    name: 'Sunset Crag',
    longitude: 16.60071,
    latitude: 49.239977,
    createdById: UserInit.USER_JOHN_DOE_ID,
  },
  // Dark Peak - coordinates from RouteInit.ROUTE_13_ID
  {
    id: CLIMBING_OBJECT_3_ID,
    name: 'Dark Peak',
    longitude: 16.59549,
    latitude: 49.24551,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
  },
  // Shadow Wall - coordinates from RouteInit.ROUTE_17_ID
  {
    id: CLIMBING_OBJECT_4_ID,
    name: 'Shadow Wall',
    longitude: 16.60072,
    latitude: 49.23997,
    createdById: UserInit.USER_JANE_DOE_ID,
  },
  // Moonlight Crag - coordinates from RouteInit.ROUTE_22_ID
  {
    id: CLIMBING_OBJECT_5_ID,
    name: 'Moonlight Crag',
    longitude: 16.59551,
    latitude: 49.24549,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
  },
  // Black Magic Wall - coordinates from RouteInit.ROUTE_27_ID
  {
    id: CLIMBING_OBJECT_6_ID,
    name: 'Black Magic Wall',
    longitude: 16.5821,
    latitude: 49.21046,
    createdById: UserInit.USER_JOHN_DOE_ID,
  },
]

async function initClimbingObjects() {
  await Promise.all(
    climbingObjects.map((obj) =>
      prisma.climbingObject.upsert({
        where: { id: obj.id },
        update: {
          ...obj,
          deleted: false,
        },
        create: {
          ...obj,
          deleted: false,
        },
      })
    )
  )
}

export default initClimbingObjects
