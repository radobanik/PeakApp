import {
  USER_CHRIS_BROWN_ID,
  USER_EMILY_JOHNSON_ID,
  USER_JANE_DOE_ID,
  USER_JOHN_DOE_ID,
  USER_MICHAEL_SMITH_ID,
} from './user.init'

import {
  SESSION_1_ID,
  SESSION_2_ID,
  SESSION_3_ID,
  SESSION_4_ID,
  SESSION_5_ID,
} from './session.init'
import { PrismaClient } from '@prisma/client'

const likeClient = new PrismaClient().like

export const LIKES = [
  { id: '0003fa2e-ec43-45da-9b21-765bc22ba165', sessionId: SESSION_1_ID, userId: USER_JOHN_DOE_ID },
  { id: 'f1a7b100-1d61-4e22-a935-21b50d960f09', sessionId: SESSION_2_ID, userId: USER_JANE_DOE_ID },
  {
    id: 'ccd5eb75-8652-4f93-937b-cd3c73cd04c1',
    sessionId: SESSION_3_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    id: '59fc6e2f-876b-48ec-a9e0-9f9c493e11c2',
    sessionId: SESSION_4_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  {
    id: 'd6cdd0a6-c216-4966-9d3a-fae4de3f0dfb',
    sessionId: SESSION_5_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { id: '914ea76a-65e1-419f-a8fa-9e7f7ad7f2d6', sessionId: SESSION_1_ID, userId: USER_JANE_DOE_ID },
  {
    id: '7e8a0f77-4e6f-4634-8b56-3100d6acdb3b',
    sessionId: SESSION_2_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    id: '13c2fc8d-e13a-4e8c-89aa-6c1819d0c1b2',
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  { id: 'f11e22bb-982b-4b96-bf8f-f1e4e2c89990', sessionId: SESSION_4_ID, userId: USER_JOHN_DOE_ID },
  { id: 'aafe13f5-22e5-4d58-9a31-991a2aafbf95', sessionId: SESSION_5_ID, userId: USER_JANE_DOE_ID },
  {
    id: '612b6d03-e8cf-443d-9af4-dc5c993c5be2',
    sessionId: SESSION_1_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  {
    id: 'a6f8719c-96b7-49d7-8cce-7b6ae8b7c76c',
    sessionId: SESSION_2_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  { id: 'cf43f582-6dc5-4f07-9e58-4b6ef10d76ce', sessionId: SESSION_3_ID, userId: USER_JOHN_DOE_ID },
  {
    id: 'b6b14f17-6c2f-4562-8e8a-8026b7cb3c77',
    sessionId: SESSION_4_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    id: 'd0db413c-d272-4356-bba4-fd97df7cf42f',
    sessionId: SESSION_5_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  {
    id: 'b14bcda3-1c66-4f85-a3b2-0d2c91b4a6ce',
    sessionId: SESSION_1_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    id: '77dbb8a7-5a5a-4aa4-9e88-32898d1aa06d',
    sessionId: SESSION_2_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { id: '59db3a24-0ea7-4a10-8cf6-5d3c80ef3282', sessionId: SESSION_3_ID, userId: USER_JANE_DOE_ID },
  {
    id: 'd38c0f6f-53a2-4f0f-8010-8732c9e84117',
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { id: 'b58ef8ec-4b9e-4f7f-9d65-3d8803b3a755', sessionId: SESSION_5_ID, userId: USER_JOHN_DOE_ID },
]

async function initLikes() {
  await Promise.all(
    LIKES.map((like) =>
      likeClient.upsert({
        where: {
          id: like.id,
        },
        create: {
          id: like.id,
          sessionId: like.sessionId,
          userId: like.userId,
        },
        update: {},
      })
    )
  )
}

export default initLikes
