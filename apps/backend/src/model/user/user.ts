type User = {
  id: string
  userName: string
  password: string
  email: string

  firstName: string
  lastName: string

  birthday: Date | null
  height: number | null
  weight: number | null

  city: {
    id: string
    name: string
    country: {
      id: string
      name: string
      code: string
    }
  } | null

  createdAt: Date
  updatedAt: Date | null
  deleted: boolean
}

export type { User }
