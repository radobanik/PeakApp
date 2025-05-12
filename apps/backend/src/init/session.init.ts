import { PrismaClient } from '@prisma/client'
import * as UserInit from './user.init'
import * as ActivityInit from './activity.init'

const sessionClient = new PrismaClient().session

// Activity IDs
export const SESSION_1_ID = 'e9f1d6a2-75f5-4b3a-9e6e-cc3e8dbb476e'
export const SESSION_2_ID = 'adf36c29-78b8-4641-923e-1e8a5de5f2a0'
export const SESSION_3_ID = 'c13e716e-1835-4f9d-a12c-38ae41b94cf6'
export const SESSION_4_ID = '5c3d2be4-e7c3-4b08-9f9e-5fdce46c8a9a'
export const SESSION_5_ID = 'b6f2e802-47a2-4c30-8888-8a93fc3e499e'

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
    photos: {},
  },
  {
    id: SESSION_2_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    name: 'Outdoor bouldering session',
    note: 'Mostly focused on technique and footwork; managed to flash a couple of tricky slab routes.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_3_CHRIS_BROWN_ID }],
    },
    photos: {},
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
    photos: {},
  },
  {
    id: SESSION_4_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Birthday session',
    note: 'Tired from the start, but still had fun; climbed easier routes and practiced downclimbing.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_11_JANE_DOE_ID }],
    },
    photos: {},
  },
  {
    id: SESSION_5_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    name: 'Friends meeting on boulder',
    note: 'Great session with friends! Lots of attempts on the cave section, made solid progress on my endurance.',
    assignedActivities: {
      connect: [{ id: ActivityInit.ACTIVITY_12_JANE_DOE_ID }],
    },
    photos: {},
  },
]

async function initSessions() {
  await Promise.all(
    sessions.map((activity) =>
      sessionClient.upsert({
        where: { id: activity.id },
        update: activity,
        create: activity,
      })
    )
  )
}

export default initSessions
