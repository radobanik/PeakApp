import e from 'express'
import { SessionDetail, sessionDetailSelector } from '../session'

type CommunitySessionDetail = {
  id: string
  session: SessionDetail
  likes: number
  hasLiked: boolean
  comments: number
}

const selector = {
  session: {
    select: sessionDetailSelector,
  },
}

export type { CommunitySessionDetail }
export { selector }
