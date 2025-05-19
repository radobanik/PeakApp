import prisma from '../core/prisma/client'
import { AchievementType, PeakFileSource } from '@prisma/client'
import { USER_JANE_DOE_ID } from './user.init'

// Achievements
export const DAYS_REGISTERED_ACH_1_ID = '7d8e9f0a-1b2c-44d3-e5f6-a7b8c9d0e1f2'
export const DAYS_REGISTERED_ACH_2_ID = '2c3d4e5f-6a7b-45c8-d9e0-f1a2b3c4d5e6'
export const DAYS_REGISTERED_ACH_3_ID = 'f9e8d7c6-b5a4-46f3-e2d1-c0b9a8f7e6d5'

export const COMMENTS_COUNT_ACH_1_ID = '1a2b3c4d-5e6f-47a8-b9c0-d1e2f3a4b5c6'
export const COMMENTS_COUNT_ACH_2_ID = '6d5c4b3a-2e1f-48d9-c0b1-a2f3e4d5c6b7'

export const SESSIONS_COUNT_ACH_1_ID = 'e0f1a2b3-c4d5-49e6-f7a8-b9c0d1e2f3a4'
export const SESSIONS_COUNT_ACH_2_ID = '5b6c7d8e-9f0a-4a1b-c2d3-e4f5a6b7c8d9'
export const SESSIONS_COUNT_ACH_3_ID = 'c3d4e5f6-7a8b-4b2c-d3e4-f5a6b7c8d9e0'

export const MAX_ACTIVITY_PER_SESSION_ACH_1_ID = '8a9b0c1d-2e3f-4c0d-e1f2-a3b4c5d6e7f8'
export const MAX_ACTIVITY_PER_SESSION_ACH_2_ID = '4d5e6f7a-8b9c-4d0e-f1a2-b3c4d5e6f7a8'

export const MAX_LIKE_ON_SESSION_ACH_1_ID = '9e8f7a6b-5c4d-4e1f-a2b3-c4d5e6f7a8b9'
export const MAX_LIKE_ON_SESSION_ACH_2_ID = '0a1b2c3d-4e5f-4f0a-b1c2-d3e4f5a6b7c8'

export const ROUTE_TOPPED_COUNT_ACH_1_ID = 'b7c8d9e0-f1a2-4a3b-c4d5-e6f7a8b9c0d1'
export const ROUTE_TOPPED_COUNT_ACH_2_ID = '2d3e4f5a-6b7c-4b0c-d1e2-f3a4b5c6d7e8'
export const ROUTE_TOPPED_COUNT_ACH_3_ID = 'e6f7a8b9-c0d1-4c2d-e3f4-a5b6c7d8e9f0'

export const ROUTE_REVIEW_COUNT_ACH_1_ID = '1f2a3b4c-5d6e-4d1e-f2a3-b4c5d6e7f8a9'
export const ROUTE_REVIEW_COUNT_ACH_2_ID = 'c5d6e7f8-a9b0-4e1f-a2b3-c4d5e6f7a8b9'

// First Time Achievements
export const DAYS_REGISTERED_ACH_FIRST_ID = 'f0e1d2c3-aaaa-4aaa-aaaa-111111111111'
export const COMMENTS_COUNT_ACH_FIRST_ID = 'a1b2c3d4-cccc-4ccc-cccc-333333333333'
export const SESSIONS_COUNT_ACH_FIRST_ID = 'c3d4e5f6-eeee-4eee-eeee-555555555555'
export const ROUTE_TOPPED_COUNT_ACH_FIRST_ID = 'e5f6a7b8-0000-4000-0000-777777777777'
export const ROUTE_REVIEW_COUNT_ACH_FIRST_ID = 'a7b8c9d0-2222-4222-2222-999999999999'

// Icon IDs - PeakFile
export const DAYS_REGISTERED_ACH_1_ICON_ID = 'a1b2c3d4-1111-4111-1111-111111111111'
export const DAYS_REGISTERED_ACH_2_ICON_ID = 'c3d4e5f6-3333-4333-3333-333333333333'
export const DAYS_REGISTERED_ACH_3_ICON_ID = 'e5f6a7b8-5555-4555-5555-555555555555'

export const COMMENTS_COUNT_ACH_1_ICON_ID = 'a8b9c0d1-7777-4777-7777-777777777777'
export const COMMENTS_COUNT_ACH_2_ICON_ID = 'c0d1e2f3-9999-4999-9999-999999999999'

export const SESSIONS_COUNT_ACH_1_ICON_ID = 'e2f3a4b5-bbbb-4bbb-bbbb-bbbbbbbbbbbb'
export const SESSIONS_COUNT_ACH_2_ICON_ID = 'a4b5c6d7-dddd-4ddd-dddd-dddddddddddd'
export const SESSIONS_COUNT_ACH_3_ICON_ID = 'c6d7e8f9-ffff-4fff-ffff-ffffffffffff'

export const MAX_ACTIVITY_PER_SESSION_ACH_1_ICON_ID = 'e8f9a0b1-1111-4111-1111-111111111111'
export const MAX_ACTIVITY_PER_SESSION_ACH_2_ICON_ID = 'a0b1c2d3-3333-4333-3333-333333333333'

export const MAX_LIKE_ON_SESSION_ACH_1_ICON_ID = 'c2d3e4f5-5555-4555-5555-555555555555'
export const MAX_LIKE_ON_SESSION_ACH_2_ICON_ID = 'e4f5a6b7-7777-4777-7777-777777777777'

export const ROUTE_TOPPED_COUNT_ACH_1_ICON_ID = 'a6b7c8d9-9999-4999-9999-999999999999'
export const ROUTE_TOPPED_COUNT_ACH_2_ICON_ID = 'c8d9e0f1-bbbb-4bbb-bbbb-bbbbbbbbbbbb'
export const ROUTE_TOPPED_COUNT_ACH_3_ICON_ID = 'e0f1a2b3-dddd-4ddd-dddd-dddddddddddd'

export const ROUTE_REVIEW_COUNT_ACH_1_ICON_ID = 'a2b3c4d5-ffff-4fff-ffff-ffffffffffff'
export const ROUTE_REVIEW_COUNT_ACH_2_ICON_ID = 'c4d5e6f7-1111-4111-1111-111111111111'

// First Time Achievement Icon IDs
export const DAYS_REGISTERED_ACH_FIRST_ICON_ID = 'f0e1d2c3-bbbb-4bbb-bbbb-222222222222'
export const COMMENTS_COUNT_ACH_FIRST_ICON_ID = 'b2c3d4e5-dddd-4ddd-dddd-444444444444'
export const SESSIONS_COUNT_ACH_FIRST_ICON_ID = 'd4e5f6a7-ffff-4fff-ffff-666666666666'
export const ROUTE_TOPPED_COUNT_ACH_FIRST_ICON_ID = 'f6a7b8c9-1111-4111-1111-888888888888'
export const ROUTE_REVIEW_COUNT_ACH_FIRST_ICON_ID = 'b8c9d0e1-3333-4333-3333-000000000000'

const INIT_USER_ID = USER_JANE_DOE_ID // Assuming this is the ID of a user who creates these initial files
const ACHIEVEMENT_ICON_URL = 'https://www.svgrepo.com/show/425599/achievement-reward-winner.svg' // Example SVG URL

// Define the PeakFile records for the achievement icons
const achievementIcons = [
  {
    id: DAYS_REGISTERED_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 7 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 30 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 365 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: COMMENTS_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count 10 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count 50 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: SESSIONS_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 5 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 20 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 100 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Max Activity Per Session 10 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Max Activity Per Session 25 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: MAX_LIKE_ON_SESSION_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Max Like On Session 5 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: MAX_LIKE_ON_SESSION_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Max Like On Session 20 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: ROUTE_TOPPED_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 10 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 50 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 200 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  {
    id: ROUTE_REVIEW_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count 5 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count 25 Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },

  // First Time Achievement Icons
  {
    id: DAYS_REGISTERED_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered First Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count First Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count First Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count First Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count First Icon',
    contentType: 'image/svg+xml',
    identifier: ACHIEVEMENT_ICON_URL,
    source: PeakFileSource.GENERIC_URL,
    createdById: INIT_USER_ID,
  },
]

const achievements = [
  // Days Registered Achievements
  {
    id: DAYS_REGISTERED_ACH_1_ID,
    name: 'New Member',
    description: 'Registered for 7 days',
    minimumValue: 7,
    type: AchievementType.DAYS_REGISTERED,
    iconId: DAYS_REGISTERED_ACH_1_ICON_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_2_ID,
    name: 'Active Member',
    description: 'Registered for 30 days',
    minimumValue: 30,
    type: AchievementType.DAYS_REGISTERED,
    iconId: DAYS_REGISTERED_ACH_2_ICON_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_3_ID,
    name: 'Veteran Member',
    description: 'Registered for 365 days',
    minimumValue: 365,
    type: AchievementType.DAYS_REGISTERED,
    iconId: DAYS_REGISTERED_ACH_3_ICON_ID,
  }, // Comments Count Achievements

  {
    id: COMMENTS_COUNT_ACH_1_ID,
    name: 'First Words',
    description: 'Posted 10 comments',
    minimumValue: 10,
    type: AchievementType.COMMENTS_COUNT,
    iconId: COMMENTS_COUNT_ACH_1_ICON_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_2_ID,
    name: 'Chatterbox',
    description: 'Posted 50 comments',
    minimumValue: 50,
    type: AchievementType.COMMENTS_COUNT,
    iconId: COMMENTS_COUNT_ACH_2_ICON_ID,
  }, // Sessions Count Achievements

  {
    id: SESSIONS_COUNT_ACH_1_ID,
    name: 'Getting Started',
    description: 'Created 5 sessions',
    minimumValue: 5,
    type: AchievementType.SESSIONS_COUNT,
    iconId: SESSIONS_COUNT_ACH_1_ICON_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_2_ID,
    name: 'Regular Climber',
    description: 'Created 20 sessions',
    minimumValue: 20,
    type: AchievementType.SESSIONS_COUNT,
    iconId: SESSIONS_COUNT_ACH_2_ICON_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_3_ID,
    name: 'Dedicated Logger',
    description: 'Created 100 sessions',
    minimumValue: 100,
    type: AchievementType.SESSIONS_COUNT,
    iconId: SESSIONS_COUNT_ACH_3_ICON_ID,
  }, // Max Activity Per Session Achievements

  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_1_ID,
    name: 'Long Session',
    description: 'Recorded 10 activities in one session',
    minimumValue: 10,
    type: AchievementType.MAX_ACTIVITY_PER_SESSION,
    iconId: MAX_ACTIVITY_PER_SESSION_ACH_1_ICON_ID,
  },
  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_2_ID,
    name: 'Epic Session',
    description: 'Recorded 25 activities in one session',
    minimumValue: 25,
    type: AchievementType.MAX_ACTIVITY_PER_SESSION,
    iconId: MAX_ACTIVITY_PER_SESSION_ACH_2_ICON_ID,
  }, // Max Like On Session Achievements

  {
    id: MAX_LIKE_ON_SESSION_ACH_1_ID,
    name: 'Liked Session',
    description: 'Session liked by 5 users',
    minimumValue: 5,
    type: AchievementType.MAX_LIKE_ON_SESSION,
    iconId: MAX_LIKE_ON_SESSION_ACH_1_ICON_ID,
  },
  {
    id: MAX_LIKE_ON_SESSION_ACH_2_ID,
    name: 'Popular Session',
    description: 'Session liked by 20 users',
    minimumValue: 20,
    type: AchievementType.MAX_LIKE_ON_SESSION,
    iconId: MAX_LIKE_ON_SESSION_ACH_2_ICON_ID,
  },

  // Route Topped Count Achievements
  {
    id: ROUTE_TOPPED_COUNT_ACH_1_ID,
    name: 'Route Starter',
    description: 'Topped 10 routes',
    minimumValue: 10,
    type: AchievementType.ROUTE_TOPPED_COUNT,
    iconId: ROUTE_TOPPED_COUNT_ACH_1_ICON_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_2_ID,
    name: 'Route Climber',
    description: 'Topped 50 routes',
    minimumValue: 50,
    type: AchievementType.ROUTE_TOPPED_COUNT,
    iconId: ROUTE_TOPPED_COUNT_ACH_2_ICON_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_3_ID,
    name: 'Route Master',
    description: 'Topped 200 routes',
    minimumValue: 200,
    type: AchievementType.ROUTE_TOPPED_COUNT,
    iconId: ROUTE_TOPPED_COUNT_ACH_3_ICON_ID,
  }, // Route Review Count Achievements

  {
    id: ROUTE_REVIEW_COUNT_ACH_1_ID,
    name: 'First Reviewer',
    description: 'Reviewed 5 routes',
    minimumValue: 5,
    type: AchievementType.ROUTE_REVIEW_COUNT,
    iconId: ROUTE_REVIEW_COUNT_ACH_1_ICON_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_2_ID,
    name: 'Experienced Critic',
    description: 'Reviewed 25 routes',
    minimumValue: 25,
    type: AchievementType.ROUTE_REVIEW_COUNT,
    iconId: ROUTE_REVIEW_COUNT_ACH_2_ICON_ID,
  },

  // First Time Achievements
  {
    id: DAYS_REGISTERED_ACH_FIRST_ID,
    name: 'First Week',
    description: 'Registered for 1 day',
    minimumValue: 1,
    type: AchievementType.DAYS_REGISTERED,
    iconId: DAYS_REGISTERED_ACH_FIRST_ICON_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_FIRST_ID,
    name: 'First Comment',
    description: 'Posted your first comment',
    minimumValue: 1,
    type: AchievementType.COMMENTS_COUNT,
    iconId: COMMENTS_COUNT_ACH_FIRST_ICON_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_FIRST_ID,
    name: 'First Session',
    description: 'Created your first session',
    minimumValue: 1,
    type: AchievementType.SESSIONS_COUNT,
    iconId: SESSIONS_COUNT_ACH_FIRST_ICON_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_FIRST_ID,
    name: 'First Top',
    description: 'Topped your first route',
    minimumValue: 1,
    type: AchievementType.ROUTE_TOPPED_COUNT,
    iconId: ROUTE_TOPPED_COUNT_ACH_FIRST_ICON_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_FIRST_ID,
    name: 'First Review',
    description: 'Reviewed your first route',
    minimumValue: 1,
    type: AchievementType.ROUTE_REVIEW_COUNT,
    iconId: ROUTE_REVIEW_COUNT_ACH_FIRST_ICON_ID,
  },
]

async function initAchievements() {
  for (const icon of achievementIcons) {
    await prisma.peakFile.upsert({
      where: { id: icon.id },
      update: icon,
      create: icon,
    })
  }

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: achievement,
      create: achievement,
    })
  }
}

export default initAchievements
export { achievements, achievementIcons }
