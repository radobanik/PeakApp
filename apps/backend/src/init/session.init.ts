import prisma from '../core/prisma/client'
import * as UserInit from './user.init'
import * as ActivityInit from './activity.init'
import { PeakFileSource } from '@prisma/client'

// Activity IDs
export const SESSION_1_ID = 'e9f1d6a2-75f5-4b3a-9e6e-cc3e8dbb476e'
export const SESSION_2_ID = 'adf36c29-78b8-4641-923e-1e8a5de5f2a0'
export const SESSION_3_ID = 'c13e716e-1835-4f9d-a12c-38ae41b94cf6'
export const SESSION_4_ID = '5c3d2be4-e7c3-4b08-9f9e-5fdce46c8a9a'
export const SESSION_5_ID = 'b6f2e802-47a2-4c30-8888-8a93fc3e499e'

export const SESSION_IMG_1 = 'c7a0fc1d-3b68-4e23-9b94-781920e3bb8d'
export const SESSION_IMG_2 = '9e6d3b48-fae1-4ae9-92e6-d9f72e0487ac'
export const SESSION_IMG_3 = 'f5d418cc-03a3-4d4a-a1ce-c6286af7d899'
export const SESSION_IMG_4 = '39ef7480-6be6-4077-8c42-6434d90e02b9'
export const SESSION_IMG_5 = '8b44ad3f-2f72-49fd-b88f-7a20d4072e08'
export const SESSION_IMG_6 = 'a7b82a95-2ff1-4cb9-92c0-06405d4953ea'
export const SESSION_IMG_7 = 'd95f47b0-445b-4e5b-9506-32d1795a17cc'
export const SESSION_IMG_8 = '89f1942d-ec14-42fa-b6c6-dc7607a3737d'
export const SESSION_IMG_9 = 'd4474e44-9970-448b-b58d-1461a26c12fc'
export const SESSION_IMG_10 = '312b0a94-64ed-47d3-a6f2-21dba607e1e6'

const INIT_USER_ID = UserInit.USER_JANE_DOE_ID
const SESSION_1_IMG =
  'https://d2u4q3iydaupsp.cloudfront.net/rOEgMvi0FfL8kOR8HxVNibCMbEFhZPh5JMfEuvmjvaawr5RjLqArnpEJWHhKsPSNKn193WbENxlxVN3yV3JX1Q5qh9kyiVYCKE2VzCY1JaTPjlEVjAR9DWRlkDnQInbM'
const SESSION_2_IMG =
  'https://d2u4q3iydaupsp.cloudfront.net/4GuEmMwZYyRm1Mr4fFXBt50Uqt9L8HVVZ8bE2wRRYqbucLWwjawSXGDmjV1OUZoJH9nY3pwk6PeVCGIAXbDx8WhxuLzRiKfdEzm9zTCmNrUwwpLnr8XXJzryUR7ZwQPO'
const SESSION_3_IMG = 'https://wheel-life.com/wp-content/uploads/2020/01/Ge9PDJOHQarBbRZ6yCqFQ.jpg'
const SESSION_4_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Adam_Ondra_climbing_Silence%2C_9c_by_PAVEL_BLAZEK_1-cropped.jpg/250px-Adam_Ondra_climbing_Silence%2C_9c_by_PAVEL_BLAZEK_1-cropped.jpg'
const SESSION_5_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/2/26/New_River_Gorge_-_Supercrack_-_1.jpg'

const media = [
  {
    id: SESSION_IMG_1,
    createdAt: new Date(),
    name: 'session 1 photo',
    contentType: 'image/png',
    identifier: SESSION_1_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_2,
    createdAt: new Date(),
    name: 'session 2 photo',
    contentType: 'image/png',
    identifier: SESSION_2_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_3,
    createdAt: new Date(),
    name: 'session 3 photo',
    contentType: 'image/png',
    identifier: SESSION_3_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_4,
    createdAt: new Date(),
    name: 'session 4 photo',
    contentType: 'image/png',
    identifier: SESSION_4_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_5,
    createdAt: new Date(),
    name: 'session 5 photo',
    contentType: 'image/png',
    identifier: SESSION_5_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_6,
    createdAt: new Date(),
    name: 'session 6 photo',
    contentType: 'image/png',
    identifier: SESSION_1_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_7,
    createdAt: new Date(),
    name: 'session 7 photo',
    contentType: 'image/png',
    identifier: SESSION_2_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_8,
    createdAt: new Date(),
    name: 'session 8 photo',
    contentType: 'image/png',
    identifier: SESSION_3_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_9,
    createdAt: new Date(),
    name: 'session 9 photo',
    contentType: 'image/png',
    identifier: SESSION_4_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_10,
    createdAt: new Date(),
    name: 'session 10 photo',
    contentType: 'image/png',
    identifier: SESSION_5_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
]

const mediaMapping: Record<string, string[]> = {
  [SESSION_1_ID]: [SESSION_IMG_1, SESSION_IMG_9],
  [SESSION_2_ID]: [SESSION_IMG_2, SESSION_IMG_10],
  [SESSION_3_ID]: [SESSION_IMG_3, SESSION_IMG_6],
  [SESSION_4_ID]: [SESSION_IMG_4, SESSION_IMG_7],
  [SESSION_5_ID]: [SESSION_IMG_5, SESSION_IMG_8],
}

const sessions = [
  {
    id: SESSION_1_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Indoor session - EXTRA HARD',
    note: 'Great session! Climbed a lot of routes.',
    assignedActivities: {
      connect: [
        { id: ActivityInit.ACTIVITY_1_CHRIS_BROWN_ID },
        { id: ActivityInit.ACTIVITY_2_CHRIS_BROWN_ID },
      ],
    },
    photos: {
      create: mediaMapping[SESSION_1_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_2_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Outdoor bouldering session',
    note: 'Mostly focused on technique and footwork; managed to flash a couple of tricky slab routes.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_3_CHRIS_BROWN_ID }],
    },
    photos: {
      create: mediaMapping[SESSION_2_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_3_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    name: 'Outdoor bouldering session with friends',
    note: 'Tried some new problems on the comp wall—super dynamic, got me pumped quickly.',
    assignedActivities: {
      connect: [
        { id: ActivityInit.ACTIVITY_6_JOHN_DOE_ID },
        { id: ActivityInit.ACTIVITY_7_JOHN_DOE_ID },
        { id: ActivityInit.ACTIVITY_8_JOHN_DOE_ID },
        { id: ActivityInit.ACTIVITY_9_JOHN_DOE_ID },
        { id: ActivityInit.ACTIVITY_10_JOHN_DOE_ID },
      ],
    },
    photos: {
      create: mediaMapping[SESSION_3_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_4_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Birthday session',
    note: 'Tired from the start, but still had fun; climbed easier routes and practiced downclimbing.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_11_JANE_DOE_ID }],
    },
    photos: {
      create: mediaMapping[SESSION_4_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_5_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Friends meeting on boulder',
    note: 'Great session with friends! Lots of attempts on the cave section, made solid progress on my endurance.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_12_JANE_DOE_ID }],
    },
    photos: {
      create: mediaMapping[SESSION_5_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
]

async function initSessions() {
  // First create/update all media files
  for (const mediaItem of media) {
    await prisma.peakFile.upsert({
      where: { id: mediaItem.id },
      update: mediaItem,
      create: mediaItem,
    })
  }

  // Then create/update sessions with photo connections
  for (const session of sessions) {
    await prisma.session.upsert({
      where: { id: session.id },
      update: {
        ...session,
        photos: {
          deleteMany: {}, // First delete existing relations
          create: mediaMapping[session.id].map((photoId) => ({
            peakFile: { connect: { id: photoId } },
          })),
        },
      },
      create: session,
    })
  }
}

export default initSessions
