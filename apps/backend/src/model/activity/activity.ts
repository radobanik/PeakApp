import { Difficulty, User } from '@prisma/client'
import { Route } from '../route'
import { Session } from '../session/session'

type Activity = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  createdBy: User

  climbedAt: Date
  reviewStars: number
  reviewText: string
  numOfAttempts: number
  perceivedDifficulty: Difficulty
  notes: string
  topped: boolean

  session: Session
  route: Route
}

export type { Activity }
