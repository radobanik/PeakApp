import prisma from '../core/prisma/client'
import { Difficulty } from '@prisma/client'
import * as UserInit from './user.init'
import * as RouteInit from './route.init'

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
export const ACTIVITY_16_SARAH_WILSON_ID = '4b425b1b-5148-5ab3-bcf2-789012345678'
export const ACTIVITY_17_SARAH_WILSON_ID = '5c536c2c-6259-6bc4-cde3-890123456789'
export const ACTIVITY_18_DAVID_LEE_ID = '6d647d3d-736a-7cd5-def4-901234567890'
export const ACTIVITY_19_LISA_TAYLOR_ID = '7e758e4e-847b-8de6-efg5-012345678901'
export const ACTIVITY_20_JAMES_MILLER_ID = '8f869f5f-958c-9ef7-fgh6-123456789012'
export const ACTIVITY_21_EMMA_DAVIS_ID = '9g97ag6g-a69d-afg8-ghi7-234567890123'
export const ACTIVITY_22_JOHN_DOE_ID = 'b1c2d3e4-f5g6-h7i8-j9k0-345678901234'
export const ACTIVITY_23_JANE_DOE_ID = 'c2d3e4f5-g6h7-i8j9-k0l1-456789012345'
export const ACTIVITY_24_CHRIS_BROWN_ID = 'd3e4f5g6-h7i8-j9k0-l1m2-567890123456'
export const ACTIVITY_25_EMILY_JOHNSON_ID = 'e4f5g6h7-i8j9-k0l1-m2n3-678901234567'
export const ACTIVITY_26_MICHAEL_SMITH_ID = 'f5g6h7i8-j9k0-l1m2-n3o4-789012345678'

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
  {
    id: ACTIVITY_16_SARAH_WILSON_ID,
    createdById: UserInit.USER_SARAH_WILSON_ID,
    climbedAt: new Date('2025-03-28'),
    reviewStars: 5,
    reviewText: 'Perfect balance of technique and strength.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Finally got the heel hook sequence!',
    topped: true,
    routeId: RouteInit.ROUTE_2_ID,
  },
  {
    id: ACTIVITY_17_SARAH_WILSON_ID,
    createdById: UserInit.USER_SARAH_WILSON_ID,
    climbedAt: new Date('2025-03-29'),
    reviewStars: 4,
    reviewText: 'Challenging but rewarding.',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'The crux move is tricky.',
    topped: true,
    routeId: RouteInit.ROUTE_4_ID,
  },
  {
    id: ACTIVITY_18_DAVID_LEE_ID,
    createdById: UserInit.USER_DAVID_LEE_ID,
    climbedAt: new Date('2025-03-28'),
    reviewStars: 5,
    reviewText: 'Amazing line with interesting moves.',
    numOfAttempts: 4,
    perceivedDifficulty: Difficulty.ULTRA_HARD,
    notes: 'Need to work on the dyno section.',
    topped: false,
    routeId: RouteInit.ROUTE_10_ID,
  },
  {
    id: ACTIVITY_19_LISA_TAYLOR_ID,
    createdById: UserInit.USER_LISA_TAYLOR_ID,
    climbedAt: new Date('2025-03-27'),
    reviewStars: 3,
    reviewText: 'Good warm-up route.',
    numOfAttempts: 1,
    perceivedDifficulty: Difficulty.EASY,
    notes: 'Clean send first try.',
    topped: true,
    routeId: RouteInit.ROUTE_1_ID,
  },
  {
    id: ACTIVITY_20_JAMES_MILLER_ID,
    createdById: UserInit.USER_JAMES_MILLER_ID,
    climbedAt: new Date('2025-03-26'),
    reviewStars: 4,
    reviewText: 'Technical and demanding.',
    numOfAttempts: 5,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'The crimps are brutal!',
    topped: true,
    routeId: RouteInit.ROUTE_8_ID,
  },
  {
    id: ACTIVITY_21_EMMA_DAVIS_ID,
    createdById: UserInit.USER_EMMA_DAVIS_ID,
    climbedAt: new Date('2025-03-25'),
    reviewStars: 5,
    reviewText: 'One of the best routes in the gym.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Took some tries but finally got it clean.',
    topped: true,
    routeId: RouteInit.ROUTE_14_ID,
  },
  {
    id: ACTIVITY_22_JOHN_DOE_ID,
    createdById: UserInit.USER_JOHN_DOE_ID,
    climbedAt: new Date('2025-04-01'),
    reviewStars: 5,
    reviewText: 'Finally sent this project!',
    numOfAttempts: 8,
    perceivedDifficulty: Difficulty.ULTRA_HARD,
    notes: 'The persistence paid off.',
    topped: true,
    routeId: RouteInit.ROUTE_12_ID,
  },
  {
    id: ACTIVITY_23_JANE_DOE_ID,
    createdById: UserInit.USER_JANE_DOE_ID,
    climbedAt: new Date('2025-04-02'),
    reviewStars: 4,
    reviewText: 'Excellent balance required.',
    numOfAttempts: 3,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Found a creative beta.',
    topped: true,
    routeId: RouteInit.ROUTE_15_ID,
  },
  {
    id: ACTIVITY_24_CHRIS_BROWN_ID,
    createdById: UserInit.USER_CHRIS_BROWN_ID,
    climbedAt: new Date('2025-04-03'),
    reviewStars: 3,
    reviewText: 'Tricky sequence in the middle.',
    numOfAttempts: 4,
    perceivedDifficulty: Difficulty.MEDIUM,
    notes: 'Need to work on slopers.',
    topped: false,
    routeId: RouteInit.ROUTE_18_ID,
  },
  {
    id: ACTIVITY_25_EMILY_JOHNSON_ID,
    createdById: UserInit.USER_EMILY_JOHNSON_ID,
    climbedAt: new Date('2025-04-04'),
    reviewStars: 5,
    reviewText: 'Beautiful line with technical moves.',
    numOfAttempts: 2,
    perceivedDifficulty: Difficulty.HARD,
    notes: 'Second attempt send!',
    topped: true,
    routeId: RouteInit.ROUTE_7_ID,
  },
  {
    id: ACTIVITY_26_MICHAEL_SMITH_ID,
    createdById: UserInit.USER_MICHAEL_SMITH_ID,
    climbedAt: new Date('2025-04-05'),
    reviewStars: 4,
    reviewText: 'Power endurance test piece.',
    numOfAttempts: 5,
    perceivedDifficulty: Difficulty.ULTRA_HARD,
    notes: 'Really had to dig deep for this one.',
    topped: true,
    routeId: RouteInit.ROUTE_21_ID,
  },
]

async function initActivities() {
  await Promise.all(
    activities.map((activity) =>
      prisma.activity.upsert({
        where: { id: activity.id },
        update: activity,
        create: activity,
      })
    )
  )
}

export default initActivities
