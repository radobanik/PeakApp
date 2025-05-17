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
  { sessionId: SESSION_1_ID, userId: USER_JOHN_DOE_ID },
  { sessionId: SESSION_2_ID, userId: USER_JANE_DOE_ID },
  {
    sessionId: SESSION_3_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    sessionId: SESSION_4_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  {
    sessionId: SESSION_5_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { sessionId: SESSION_1_ID, userId: USER_JANE_DOE_ID },
  {
    sessionId: SESSION_2_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  { sessionId: SESSION_4_ID, userId: USER_JOHN_DOE_ID },
  { sessionId: SESSION_5_ID, userId: USER_JANE_DOE_ID },
  {
    sessionId: SESSION_1_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  {
    sessionId: SESSION_2_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  { sessionId: SESSION_3_ID, userId: USER_JOHN_DOE_ID },
  {
    sessionId: SESSION_4_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    sessionId: SESSION_5_ID,
    userId: USER_EMILY_JOHNSON_ID,
  },
  {
    sessionId: SESSION_1_ID,
    userId: USER_CHRIS_BROWN_ID,
  },
  {
    sessionId: SESSION_2_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { sessionId: SESSION_3_ID, userId: USER_JANE_DOE_ID },
  {
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
  },
  { sessionId: SESSION_5_ID, userId: USER_JOHN_DOE_ID },
]

async function initLikes() {
  await Promise.all(
    LIKES.map((like) =>
      likeClient.upsert({
        where: {
          user_session_unique: {
            userId: like.userId,
            sessionId: like.sessionId,
          },
        },
        create: {
          sessionId: like.sessionId,
          userId: like.userId,
        },
        update: {},
      })
    )
  )
}

export default initLikes
