import { Session, User } from '@prisma/client'

type Comment = {
  id: string
  createdAt: Date
  updatedAt: Date | null

  userId: string
  user: User

  sessionId: string
  session: Session

  deleted: boolean
  text: string
}

export type { Comment }
