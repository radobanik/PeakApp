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
const DAYS_REGISTERED_ACH_FIRST_ID = '0a1d7cf3-7a4e-4b8b-90c4-bdebd88ce45e'
const COMMENTS_COUNT_ACH_FIRST_ID = 'a52c7641-2b2c-4595-8802-53660e72c354'
const SESSIONS_COUNT_ACH_FIRST_ID = '9bb4e5fa-94a1-4a1d-9cd3-17348de6badd'
const ROUTE_TOPPED_COUNT_ACH_FIRST_ID = '60ea3b8e-95ce-4dc3-a944-2cd123cd1337'
const ROUTE_REVIEW_COUNT_ACH_FIRST_ID = 'a8821053-b83e-414a-bb42-b3a6e9c95c41'

// Icon IDs - PeakFile
const DAYS_REGISTERED_ACH_1_ICON_ID = '1456bb8a-bf68-4ff1-b0ff-83f67c97e8b5'
const DAYS_REGISTERED_ACH_2_ICON_ID = '9e0e4e7c-83cc-47f0-bb4b-51895bc02102'
const DAYS_REGISTERED_ACH_3_ICON_ID = 'e23e6d3d-5be2-48b6-b4f5-3db34a27f2ab'

const COMMENTS_COUNT_ACH_1_ICON_ID = '2fd1a06b-28f7-4c39-bfc1-fc66cb0dc147'
const COMMENTS_COUNT_ACH_2_ICON_ID = 'ca6a84d0-810e-4c1f-b167-27600b1c7c66'

const SESSIONS_COUNT_ACH_1_ICON_ID = 'b30d4bb8-fdd1-4b1a-9ff4-15cb98096f9e'
const SESSIONS_COUNT_ACH_2_ICON_ID = 'ea78e93d-c6d7-4be3-9771-f7762eac3087'
const SESSIONS_COUNT_ACH_3_ICON_ID = '41e2b9ef-2b47-49d1-8a3f-7f74982e82fc'

const MAX_ACTIVITY_PER_SESSION_ACH_1_ICON_ID = '91be9e0f-2733-4120-9a4d-6e801118a377'
const MAX_ACTIVITY_PER_SESSION_ACH_2_ICON_ID = '9ae2dc9f-5de8-4c53-b9fd-967134aaf08e'

const MAX_LIKE_ON_SESSION_ACH_1_ICON_ID = '55f207e3-086e-4c50-8e40-8706b3f1b9c5'
const MAX_LIKE_ON_SESSION_ACH_2_ICON_ID = 'ad4f0200-9386-4e15-aed1-0e8f4985d728'

const ROUTE_TOPPED_COUNT_ACH_1_ICON_ID = '07329cf2-845f-4c62-9738-b4fda1b6b205'
const ROUTE_TOPPED_COUNT_ACH_2_ICON_ID = '3aeec4c0-45c7-429c-861b-65ad5eb81f44'
const ROUTE_TOPPED_COUNT_ACH_3_ICON_ID = '47034f2b-0730-4f84-bb6b-cf7cf73c2fe9'

const ROUTE_REVIEW_COUNT_ACH_1_ICON_ID = '0a4e3be4-4904-4c67-98ec-3918c3c6c6eb'
const ROUTE_REVIEW_COUNT_ACH_2_ICON_ID = 'a7dc2172-452c-4328-b8fd-fec981a51a96'

const DAYS_REGISTERED_ACH_FIRST_ICON_ID = '7b168553-bfd9-4f13-a0fd-cf6b78e33b90'
const COMMENTS_COUNT_ACH_FIRST_ICON_ID = '19d04af5-f312-4324-b4a3-697ab3922e4f'
const SESSIONS_COUNT_ACH_FIRST_ICON_ID = '21e7c9ce-44c6-4de2-9331-40273b9b27ce'
const ROUTE_TOPPED_COUNT_ACH_FIRST_ICON_ID = '497d1c67-bde0-4ae1-bb9e-3c457c3f6c38'
const ROUTE_REVIEW_COUNT_ACH_FIRST_ICON_ID = '96480413-4bce-45b2-ae5f-7719a9fbbcd7'

const INIT_USER_ID = USER_JANE_DOE_ID

const BASE_KEY = 'init-files/achievements/'

// Days Registered
const DAY_1_KEY = BASE_KEY + '1-day.jfif'
const DAY_7_KEY = BASE_KEY + '7-day.jfif'
const DAY_30_KEY = BASE_KEY + '30-day.jfif'
const DAY_365_KEY = BASE_KEY + '365-day.jfif'

// Comments Count
const COMMENTS_1_KEY = BASE_KEY + '1-comment.jfif'
const COMMENTS_10_KEY = BASE_KEY + '10-comment.jfif'
const COMMENTS_50_KEY = BASE_KEY + '50-comment.jfif'

// Sessions Count
const SESSIONS_1_KEY = BASE_KEY + '1-session.jfif'
const SESSIONS_5_KEY = BASE_KEY + '5-session.jfif'
const SESSIONS_20_KEY = BASE_KEY + '20-session.jfif'
const SESSIONS_100_KEY = BASE_KEY + '100-session.jfif'

// Max Activity Per Session
const ACTIVITIES_10_KEY = BASE_KEY + '10-activity.jfif'
const ACTIVITIES_25_KEY = BASE_KEY + '25-activity.jfif'

// Max Like on Session
const LIKES_5_KEY = BASE_KEY + '5-like.jfif'
const LIKES_20_KEY = BASE_KEY + '20-like.jfif'

// Route Topped Count
const TOPS_1_KEY = BASE_KEY + '1-top.jfif'
const TOPS_10_KEY = BASE_KEY + '10-top.jfif'
const TOPS_50_KEY = BASE_KEY + '50-top.jfif'
const TOPS_200_KEY = BASE_KEY + '200-top.jfif'

// Route Review Count
const REVIEWS_1_KEY = BASE_KEY + '1-review.jfif'
const REVIEWS_5_KEY = BASE_KEY + '5-review.jfif'
const REVIEWS_25_KEY = BASE_KEY + '25-review.jfif'

// Define the PeakFile records for the achievement icons
const achievementIcons = [
  // Days Registered
  {
    id: DAYS_REGISTERED_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered First Icon',
    contentType: 'image/png',
    identifier: DAY_1_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 7 Icon',
    contentType: 'image/png',
    identifier: DAY_7_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 30 Icon',
    contentType: 'image/png',
    identifier: DAY_30_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: DAYS_REGISTERED_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Days Registered 365 Icon',
    contentType: 'image/png',
    identifier: DAY_365_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Comments Count
  {
    id: COMMENTS_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count First Icon',
    contentType: 'image/png',
    identifier: COMMENTS_1_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count 10 Icon',
    contentType: 'image/png',
    identifier: COMMENTS_10_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: COMMENTS_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Comments Count 50 Icon',
    contentType: 'image/png',
    identifier: COMMENTS_50_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Sessions Count
  {
    id: SESSIONS_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count First Icon',
    contentType: 'image/png',
    identifier: SESSIONS_1_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 5 Icon',
    contentType: 'image/png',
    identifier: SESSIONS_5_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 20 Icon',
    contentType: 'image/png',
    identifier: SESSIONS_20_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: SESSIONS_COUNT_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Sessions Count 100 Icon',
    contentType: 'image/png',
    identifier: SESSIONS_100_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Max Activity Per Session
  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Max Activity Per Session 10 Icon',
    contentType: 'image/png',
    identifier: ACTIVITIES_10_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: MAX_ACTIVITY_PER_SESSION_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Max Activity Per Session 25 Icon',
    contentType: 'image/png',
    identifier: ACTIVITIES_25_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Max Like on Session
  {
    id: MAX_LIKE_ON_SESSION_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Max Like On Session 5 Icon',
    contentType: 'image/png',
    identifier: LIKES_5_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: MAX_LIKE_ON_SESSION_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Max Like On Session 20 Icon',
    contentType: 'image/png',
    identifier: LIKES_20_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Route Topped Count
  {
    id: ROUTE_TOPPED_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count First Icon',
    contentType: 'image/png',
    identifier: TOPS_1_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 10 Icon',
    contentType: 'image/png',
    identifier: TOPS_10_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 50 Icon',
    contentType: 'image/png',
    identifier: TOPS_50_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_TOPPED_COUNT_ACH_3_ICON_ID,
    createdAt: new Date(),
    name: 'Route Topped Count 200 Icon',
    contentType: 'image/png',
    identifier: TOPS_200_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },

  // Route Review Count
  {
    id: ROUTE_REVIEW_COUNT_ACH_FIRST_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count First Icon',
    contentType: 'image/png',
    identifier: REVIEWS_1_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_1_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count 5 Icon',
    contentType: 'image/png',
    identifier: REVIEWS_5_KEY,
    source: PeakFileSource.S3_BUCKET,
    createdById: INIT_USER_ID,
  },
  {
    id: ROUTE_REVIEW_COUNT_ACH_2_ICON_ID,
    createdAt: new Date(),
    name: 'Route Review Count 25 Icon',
    contentType: 'image/png',
    identifier: REVIEWS_25_KEY,
    source: PeakFileSource.S3_BUCKET,
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
