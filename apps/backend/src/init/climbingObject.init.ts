import { PeakFileSource } from '@prisma/client'
import prisma from '../core/prisma/client'
import * as UserInit from './user.init'

export const CLIMBING_OBJECT_1_PHOTO_ID = '5f89b1e2-1d54-4e1b-b876-16ad098c1fe2'
export const CLIMBING_OBJECT_2_PHOTO_ID = 'c3b11bc0-3f25-4d2b-938e-c15c23c7f874'
export const CLIMBING_OBJECT_3_PHOTO_ID = 'ab01fabe-0d34-4ea7-b8a6-7c0a199ba3ae'
export const CLIMBING_OBJECT_4_PHOTO_ID = 'e9c7f3ad-a94a-4d70-83de-f03266f98b43'
export const CLIMBING_OBJECT_5_PHOTO_ID = '0a1f8bc4-1d3e-4411-9019-abc1d3f0a5e0'
export const CLIMBING_OBJECT_6_PHOTO_ID = '1b6d24f4-49b9-456a-92fd-d3be29c8e7f2'

// --- Photo Identifiers ---
const CLIMBING_OBJECT_1_PHOTO = 'init-files/co/co-1.jpg'
const CLIMBING_OBJECT_2_PHOTO = 'init-files/co/co-2.jpg'
const CLIMBING_OBJECT_3_PHOTO = 'init-files/co/co-3.jpg'
const CLIMBING_OBJECT_4_PHOTO = 'init-files/co/co-4.jpg'
const CLIMBING_OBJECT_5_PHOTO = 'init-files/co/co-5.jpg'
const CLIMBING_OBJECT_6_PHOTO = 'init-files/co/co-6.jpg'

export const photos = [
  {
    id: CLIMBING_OBJECT_1_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 1 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_1_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
  },
  {
    id: CLIMBING_OBJECT_2_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 2 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_2_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_JOHN_DOE_ID,
  },
  {
    id: CLIMBING_OBJECT_3_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 3 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_3_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
  },
  {
    id: CLIMBING_OBJECT_4_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 4 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_4_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_JANE_DOE_ID,
  },
  {
    id: CLIMBING_OBJECT_5_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 5 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_5_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
  },
  {
    id: CLIMBING_OBJECT_6_PHOTO_ID,
    createdAt: new Date(),
    name: 'climbing object 6 photo',
    contentType: 'image/jpeg',
    identifier: CLIMBING_OBJECT_6_PHOTO,
    source: PeakFileSource.S3_BUCKET,
    createdById: UserInit.USER_JOHN_DOE_ID,
  },
]

// Climbing Object IDs
export const CLIMBING_OBJECT_1_ID = 'a4b3c2d1-9f8e-4c6b-8123-2b7c9e1a5f34'
export const CLIMBING_OBJECT_2_ID = 'b5c4d3e2-af9e-4b7a-9345-1c6d0f8a7e52'
export const CLIMBING_OBJECT_3_ID = 'c6d5e4f3-b1a0-4d89-8f76-9a0e2b1c4d73'
export const CLIMBING_OBJECT_4_ID = 'd7e6f5a4-c2b1-4890-9378-3e5f6d7a9b61'
export const CLIMBING_OBJECT_5_ID = 'e8f7a6b5-d3c2-48a1-90ab-4c7e8f9a0d82'
export const CLIMBING_OBJECT_6_ID = 'f9a8b7c6-e4d3-4b2c-8cab-5d8f0a1b2e93'

const climbingObjects = [
  // Main Wall - coordinates from RouteInit.ROUTE_1_ID
  {
    id: CLIMBING_OBJECT_1_ID,
    name: 'Main Wall',
    longitude: 16.607885,
    latitude: 49.206331,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    imageId: CLIMBING_OBJECT_1_PHOTO_ID,
  },
  // Sunset Crag - coordinates from RouteInit.ROUTE_8_ID
  {
    id: CLIMBING_OBJECT_2_ID,
    name: 'Sunset Crag',
    longitude: 16.60071,
    latitude: 49.239977,
    createdById: UserInit.USER_JOHN_DOE_ID,
    imageId: CLIMBING_OBJECT_2_PHOTO_ID,
  },
  // Dark Peak - coordinates from RouteInit.ROUTE_13_ID
  {
    id: CLIMBING_OBJECT_3_ID,
    name: 'Dark Peak',
    longitude: 16.59549,
    latitude: 49.24551,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    imageId: CLIMBING_OBJECT_3_PHOTO_ID,
  },
  // Shadow Wall - coordinates from RouteInit.ROUTE_17_ID
  {
    id: CLIMBING_OBJECT_4_ID,
    name: 'Shadow Wall',
    longitude: 16.60072,
    latitude: 49.23997,
    createdById: UserInit.USER_JANE_DOE_ID,
    imageId: CLIMBING_OBJECT_4_PHOTO_ID,
  },
  // Moonlight Crag - coordinates from RouteInit.ROUTE_22_ID
  {
    id: CLIMBING_OBJECT_5_ID,
    name: 'Moonlight Crag',
    longitude: 16.59551,
    latitude: 49.24549,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    imageId: CLIMBING_OBJECT_5_PHOTO_ID,
  },
  // Black Magic Wall - coordinates from RouteInit.ROUTE_27_ID
  {
    id: CLIMBING_OBJECT_6_ID,
    name: 'Black Magic Wall',
    longitude: 16.5821,
    latitude: 49.21046,
    createdById: UserInit.USER_JOHN_DOE_ID,
    imageId: CLIMBING_OBJECT_6_PHOTO_ID,
  },
]

async function initClimbingObjects() {
  await Promise.all(
    photos.map((photo) =>
      prisma.peakFile.upsert({
        where: { id: photo.id },
        update: {
          ...photo,
        },
        create: {
          ...photo,
        },
      })
    )
  )
  await Promise.all(
    climbingObjects.map((obj) =>
      prisma.climbingObject.upsert({
        where: { id: obj.id },
        update: {
          ...obj,
          deleted: false,
          approvalState: 'APPROVED',
        },
        create: {
          ...obj,
          deleted: false,
          approvalState: 'APPROVED',
        },
      })
    )
  )
}

export default initClimbingObjects
