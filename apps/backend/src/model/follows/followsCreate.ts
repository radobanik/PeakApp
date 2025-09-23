import { z } from 'zod'
import { RefObject, refObjectSchema } from '../common/refObject'

type FollowsCreate = {
  followerId: RefObject
  followeeId: RefObject
}

const validate = (entity: FollowsCreate) =>
  z
    .object({
      followerId: refObjectSchema,
      followeeId: refObjectSchema,
    })
    .strict()
    .safeParse(entity)

export type { FollowsCreate }
export { validate as followingCreateValidator }
