import { SessionDetail, sessionDetailSelector } from '.'

type SessionCommunityDetail = SessionDetail & {
  likes: number
  hasLiked: boolean
  comments: number
}

const selector = {
  select: sessionDetailSelector,
}

export type { SessionCommunityDetail }
export { selector }
