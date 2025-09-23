import prisma from '../core/prisma/client'
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

export const COMMENTS = [
  {
    id: '0003fa2e-ec43-45da-9b21-765bc22ba165',
    text: 'Crushed my first V4 today!',
    sessionId: SESSION_1_ID,
    userId: USER_JOHN_DOE_ID,
    createdAt: '2025-04-24T22:10:10.460035Z',
  },
  {
    id: '3e22c8d4-750f-4827-806e-b636625f1322',
    text: 'Struggled with the yellow route, but learned a lot.',
    sessionId: SESSION_2_ID,
    userId: USER_JANE_DOE_ID,
    createdAt: '2025-04-24T22:10:11.460035Z',
  },
  {
    id: '7b9f684b-276d-4d10-b738-6593b5999a2b',
    text: 'Great holds, super fun wall.',
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
    createdAt: '2025-04-24T22:10:12.460035Z',
  },
  {
    id: 'e0f0d945-c1df-4d7f-9dd2-b93b264fc7db',
    text: 'Lost skin on that overhang 😅',
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
    createdAt: '2025-04-24T22:10:13.460035Z',
  },
  {
    id: 'e0526e38-8dda-49bd-a85a-4191a1c0361a',
    text: 'The slab routes are underrated.',
    sessionId: SESSION_5_ID,
    userId: USER_CHRIS_BROWN_ID,
    createdAt: '2025-04-24T22:10:14.460035Z',
  },
  {
    id: '1f525c53-f0df-42f9-8650-c884c0df597a',
    text: 'Got my first top-out on a roof problem!',
    sessionId: SESSION_1_ID,
    userId: USER_JOHN_DOE_ID,
    createdAt: '2025-04-24T22:10:15.460035Z',
  },
  {
    id: 'b609a34f-245d-470b-8e8c-c173292c4c4a',
    text: 'Felt off today, couldn’t finish anything.',
    sessionId: SESSION_2_ID,
    userId: USER_JANE_DOE_ID,
    createdAt: '2025-04-24T22:10:16.460035Z',
  },
  {
    id: '139caa7c-a4f8-43ff-aea9-c18bb9e65d60',
    text: 'Those volumes are wild!',
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
    createdAt: '2025-04-24T22:10:17.460035Z',
  },
  {
    id: 'b96ac6b9-4a85-43f7-b45c-763260bdf0ef',
    text: 'Trying to focus more on footwork lately.',
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
    createdAt: '2025-04-24T22:10:18.460035Z',
  },
  {
    id: '4539b192-0a49-4247-987c-b1e40ca4511c',
    text: 'Loved the new pink route!',
    sessionId: SESSION_5_ID,
    userId: USER_CHRIS_BROWN_ID,
    createdAt: '2025-04-24T22:10:19.460035Z',
  },
  {
    id: '5b025445-5f5c-4ff9-bbc4-263f402fb520',
    text: "Didn't expect the crux so early in the climb.",
    sessionId: SESSION_1_ID,
    userId: USER_JOHN_DOE_ID,
    createdAt: '2025-04-24T22:10:20.460035Z',
  },
  {
    id: 'bd5239da-34c0-4ea9-a2e3-bfb4d468cac1',
    text: 'Nice variety of problems today.',
    sessionId: SESSION_2_ID,
    userId: USER_JANE_DOE_ID,
    createdAt: '2025-04-24T22:10:21.460035Z',
  },
  {
    id: 'b75529bf-5670-4111-9e2d-ca5fe963cecf',
    text: 'Cramped up halfway through the session.',
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
    createdAt: '2025-04-24T22:10:22.460035Z',
  },
  {
    id: 'bab5e6cd-4d83-4a43-b52f-e6d2610bf10d',
    text: 'The route setting was top-notch.',
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
    createdAt: '2025-04-24T22:10:23.460035Z',
  },
  {
    id: '81810207-73b4-4982-9e02-629f610ee122',
    text: 'Found a good rhythm today.',
    sessionId: SESSION_5_ID,
    userId: USER_CHRIS_BROWN_ID,
    createdAt: '2025-04-24T22:10:24.460035Z',
  },
  {
    id: '0c660a0d-242a-487b-bdeb-0ecb5721a10a',
    text: 'The crimps felt sharp but doable.',
    sessionId: SESSION_2_ID,
    userId: USER_JOHN_DOE_ID,
    createdAt: '2025-04-24T22:10:25.460035Z',
  },
  {
    id: '74515105-4a4d-41ad-a015-9c937a2ecba7',
    text: 'Fell on the last move, heartbreaking!',
    sessionId: SESSION_1_ID,
    userId: USER_JANE_DOE_ID,
    createdAt: '2025-04-24T22:10:26.460035Z',
  },
  {
    id: 'f531c948-4e7e-49b6-80fe-dea596368567',
    text: 'Pretty crowded, but still a solid session.',
    sessionId: SESSION_3_ID,
    userId: USER_EMILY_JOHNSON_ID,
    createdAt: '2025-04-24T22:10:27.460035Z',
  },
  {
    id: 'aed2ddfb-2c71-4a43-aa55-cb6bb536431e',
    text: 'Warmed up slowly and felt better than usual.',
    sessionId: SESSION_4_ID,
    userId: USER_MICHAEL_SMITH_ID,
    createdAt: '2025-04-24T22:10:28.460035Z',
  },
  {
    id: '0190c65e-e901-4565-b227-cb7ad19726ea',
    text: 'Flashed my first V3—progress!',
    sessionId: SESSION_5_ID,
    userId: USER_CHRIS_BROWN_ID,
    createdAt: '2025-04-24T22:10:29.460035Z',
  },
]

async function initComments() {
  await Promise.all(
    COMMENTS.map((comment) =>
      prisma.comment.upsert({
        where: {
          id: comment.id,
        },
        create: {
          id: comment.id,
          text: comment.text,
          sessionId: comment.sessionId,
          userId: comment.userId,
          createdAt: new Date(comment.createdAt),
        },
        update: {},
      })
    )
  )
}

export default initComments
