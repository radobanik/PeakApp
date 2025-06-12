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
export const SESSION_6_ID = 'c7f3e913-58b3-5d41-9999-9ba4fd3f500f'
export const SESSION_7_ID = 'd8g4f024-69c4-6e52-aaaa-abc5ge4g611g'
export const SESSION_8_ID = 'e9h5g135-70d5-7f63-bbbb-bcd6hf5h722h'

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
export const SESSION_IMG_11 = '423c1ba5-75fe-58e4-b7g3-32eca718e2f7'
export const SESSION_IMG_12 = '534d2cb6-86gf-69f5-c8h4-43fdb829f3g8'
export const SESSION_IMG_13 = '645e3dc7-97hg-70g6-d9i5-54gec930g4h9'

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
const SESSION_6_IMG =
  'https://media.istockphoto.com/id/878242876/photo/fun-rock-climbing-session.jpg?s=612x612&w=0&k=20&c=hdydGeDc2ZksuB01SrUttKDq8Tqej_xgpDbVncV35GQ='
const SESSION_7_IMG =
  'https://cdn.prod.website-files.com/63a07ada5189954d6a5cf58e/68010bfa65a44bc335c3cfb5_Harnessed%20(thumbnail).jpg'
const SESSION_8_IMG =
  'https://www.sense.org.uk/wp-content/uploads/2023/05/220606_sense_franklyn_climbingstory_150-scaled-2048x1366-1.jpg'

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
  {
    id: SESSION_IMG_11,
    createdAt: new Date(),
    name: 'session 11 photo',
    contentType: 'image/png',
    identifier: SESSION_6_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_12,
    createdAt: new Date(),
    name: 'session 12 photo',
    contentType: 'image/png',
    identifier: SESSION_7_IMG,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSION_IMG_13,
    createdAt: new Date(),
    name: 'session 13 photo',
    contentType: 'image/png',
    identifier: SESSION_8_IMG,
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
  [SESSION_6_ID]: [SESSION_IMG_11, SESSION_IMG_12],
  [SESSION_7_ID]: [SESSION_IMG_13],
  [SESSION_8_ID]: [SESSION_IMG_6, SESSION_IMG_8],
}

const sessions = [
  {
    id: SESSION_1_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Indoor session - EXTRA HARD',
    climbedAt: new Date('2025-04-01T09:30:00'),
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
    climbedAt: new Date('2025-04-01T15:45:00'),
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
    climbedAt: new Date('2025-04-02T10:15:00'),
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
    climbedAt: new Date('2025-04-02T16:30:00'),
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
    climbedAt: new Date('2025-04-03T11:00:00'),
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
  {
    id: SESSION_6_ID,
    createdById: UserInit.USER_SARAH_WILSON_ID,
    name: 'Training Day with David',
    climbedAt: new Date('2025-04-03T14:45:00'),
    note: 'Great session working on hard routes with David. Both made progress on our projects.',
    assignedActivities: {
      connect: [
        { id: ActivityInit.ACTIVITY_16_SARAH_WILSON_ID },
        { id: ActivityInit.ACTIVITY_17_SARAH_WILSON_ID },
        { id: ActivityInit.ACTIVITY_18_DAVID_LEE_ID },
      ],
    },
    photos: {
      create: mediaMapping[SESSION_6_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_7_ID,
    createdById: UserInit.USER_JAMES_MILLER_ID,
    name: 'Evening Boulder Session',
    climbedAt: new Date('2025-04-04T17:30:00'),
    note: 'Quick after-work session. Lisa joined for warm-up.',
    assignedActivities: {
      connect: [
        { id: ActivityInit.ACTIVITY_19_LISA_TAYLOR_ID },
        { id: ActivityInit.ACTIVITY_20_JAMES_MILLER_ID },
      ],
    },
    photos: {
      create: mediaMapping[SESSION_7_ID].map((photoId) => ({
        peakFile: { connect: { id: photoId } },
      })),
    },
  },
  {
    id: SESSION_8_ID,
    createdById: UserInit.USER_EMILY_JOHNSON_ID,
    name: 'Power Endurance Training',
    climbedAt: new Date('2025-04-04T19:15:00'),
    note: 'Focused on hard routes with Michael. Great energy today!',
    assignedActivities: {
      connect: [
        { id: ActivityInit.ACTIVITY_25_EMILY_JOHNSON_ID },
        { id: ActivityInit.ACTIVITY_26_MICHAEL_SMITH_ID },
      ],
    },
    photos: {
      create: mediaMapping[SESSION_8_ID].map((photoId) => ({
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
