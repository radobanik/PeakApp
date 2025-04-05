import { Difficulty, PrismaClient } from '@prisma/client'
import * as UserInit from './user.init'
import * as RouteInit from './route.init'

const activityClient = new PrismaClient().activity

// Activity IDs
export const ACTIVITY_1_CHRIS_BROWN_ID = '3b2f6d1a-81f6-4e4e-b79f-9c47996b5ecf'
export const ACTIVITY_2_CHRIS_BROWN_ID = '7cfc6e8a-0ac5-4a7c-ae47-0379e3c1f21e'
export const ACTIVITY_3_CHRIS_BROWN_ID = '12545d09-857c-405a-8f80-e77e95e0a90f'
export const ACTIVITY_4_CHRIS_BROWN_ID = 'a75d4d7b-bf6a-4d3d-984f-c5be762681b3'
export const ACTIVITY_5_CHRIS_BROWN_ID = '9fa7e5d9-d519-4cf0-8c38-3a8bbcf66fd8'
export const ACTIVITY_6_JOHN_DOE_ID = 'e0b1c657-b4c3-4c61-bb7c-fc189d44e014'
export const ACTIVITY_7_JOHN_DOE_ID = 'c0c75a71-50b9-4531-b3b4-2e61d3cf9c95'
export const ACTIVITY_8_JOHN_DOE_ID = 'f92d3a66-0db1-42c5-9eb1-e3b0c2971277'
export const ACTIVITY_9_JOHN_DOE_ID = 'd6f92d58-cf9c-4e55-a3c4-37741f6ff6aa'
export const ACTIVITY_10_JOHN_DOE_ID = '1f9a4e79-fae2-4a83-b939-f7d3f57297d9'
export const ACTIVITY_11_JANE_DOE_ID = '8a0a176c-35a9-41b9-a2b3-37d12ac83e8c'
export const ACTIVITY_12_JANE_DOE_ID = '66de99a1-2d60-4b23-9c7b-bdf345bd3c27'
export const ACTIVITY_13_JANE_DOE_ID = '7d0de391-5804-4d17-898f-79a49f3922f3'
export const ACTIVITY_14_JANE_DOE_ID = '50e00a25-89f5-4ed4-9c6f-8cc265d6b6ef'
export const ACTIVITY_15_JANE_DOE_ID = '3a3144a0-4037-49a2-abe1-dab9c9e8e6bc'

const activities = [
  {
    id: ACTIVITY_1_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-03-01'),
    reviewStars: 4,
    reviewText: 'Fun route with some tricky holds in the middle.',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Felt strong, but slipped once.',
    topped: true,
    routeId: RouteInit.ROUTE_1_ID,
  },
  {
    id: ACTIVITY_2_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-02-20'),
    reviewStars: 5,
    reviewText: 'Loved this one! Great flow and challenging top-out.',
    numOfAttempts: 1,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Flashed it!',
    topped: true,
    routeId: RouteInit.ROUTE_2_ID,
  },
  {
    id: ACTIVITY_3_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-03-15'),
    reviewStars: 3,
    reviewText: 'Kind of awkward movement. Not my style.',
    numOfAttempts: 4,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Got frustrated on the crux.',
    topped: false,
    routeId: RouteInit.ROUTE_3_ID,
  },
  {
    id: ACTIVITY_4_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-03-10'),
    reviewStars: 2,
    reviewText: 'Slippery holds, didn’t enjoy this one much.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'May try again with better shoes.',
    topped: false,
    routeId: RouteInit.ROUTE_4_ID,
  },
  {
    id: ACTIVITY_5_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-01-28'),
    reviewStars: 5,
    reviewText: 'Perfect route for endurance practice!',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Pumped out near the top, but got it.',
    topped: true,
    routeId: RouteInit.ROUTE_5_ID,
  },
  {
    id: ACTIVITY_6_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-03-21'),
    reviewStars: 4,
    reviewText: 'Super crimpy. Felt good to top this.',
    numOfAttempts: 5,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Took a while to figure out beta.',
    topped: true,
    routeId: RouteInit.ROUTE_6_ID,
  },
  {
    id: ACTIVITY_7_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-02-18'),
    reviewStars: 3,
    reviewText: 'A little too reachy for me.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Stalled at crux. Need to work on flexibility.',
    topped: false,
    routeId: RouteInit.ROUTE_7_ID,
  },
  {
    id: ACTIVITY_8_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-03-25'),
    reviewStars: 5,
    reviewText: 'Super fun dyno at the start!',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Dynamic and exciting.',
    topped: true,
    routeId: RouteInit.ROUTE_8_ID,
  },
  {
    id: ACTIVITY_9_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-03-05'),
    reviewStars: 4,
    reviewText: 'Satisfying moves with a tricky mantle.',
    numOfAttempts: 1,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Mantle was the crux, but felt smooth.',
    topped: true,
    routeId: RouteInit.ROUTE_9_ID,
  },
  {
    id: ACTIVITY_10_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-02-12'),
    reviewStars: 5,
    reviewText: 'Absolutely brutal. Took everything I had.',
    numOfAttempts: 7,
    perceivedDifficulty: Difficulty.ULTRA_HARD,
    notes: 'Topped after many tries. Very proud.',
    topped: true,
    routeId: RouteInit.ROUTE_10_ID,
  },
  {
    id: ACTIVITY_11_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-03-27'),
    reviewStars: 2,
    reviewText: 'Hold broke mid-climb. Not ideal.',
    numOfAttempts: 1,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Reported to staff.',
    topped: false,
    routeId: RouteInit.ROUTE_10_ID,
  },
  {
    id: ACTIVITY_12_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-01-30'),
    reviewStars: 3,
    reviewText: 'Basic and short. Good warm-up.',
    numOfAttempts: 1,
    perceivedDifficulty: Difficulty.EASY,
    notes: 'Nice for a first climb of the session.',
    topped: true,
    routeId: RouteInit.ROUTE_1_ID,
  },
  {
    id: ACTIVITY_13_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-02-22'),
    reviewStars: 4,
    reviewText: 'Interesting problem-solving required.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'More technical than expected.',
    topped: true,
    routeId: RouteInit.ROUTE_12_ID,
  },
  {
    id: ACTIVITY_14_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-03-12'),
    reviewStars: 5,
    reviewText: 'One of my favorites this month!',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Really satisfying sequence.',
    topped: true,
    routeId: RouteInit.ROUTE_14_ID,
  },
  {
    id: ACTIVITY_15_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-03-30'),
    reviewStars: 4,
    reviewText: 'Really tested my grip strength.',
    numOfAttempts: 6,
    perceivedDifficulty: Difficulty.ULTRA_HARD,
    notes: 'Didn’t top, but got close.',
    topped: false,
    routeId: RouteInit.ROUTE_21_ID,
  },
]

async function initActivities() {
  await Promise.all(
    activities.map((activity) =>
      activityClient.upsert({
        where: { id: activity.id },
        update: activity,
        create: activity,
      })
    )
  )
}

export default initActivities
