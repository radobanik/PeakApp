import { PeakFile } from './fileTypes'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
  user: AuthenticatedUser
}

export interface RegisterRequest {
  email: string
  userName: string
  password: string
  firstName: string
  lastName: string
  birthday: string | null
  weight: number | null
  cityId: string | null
}

export interface IsEmailUniqueRequest {
  email: string
}
export interface IsEmailUniqueResponse {
  unique: boolean
  description: string
}

export interface IsUserNameUniqueRequest {
  userName: string
}

export interface IsUserNameUniqueResponse {
  unique: boolean
  description: string
}

export interface AuthenticatedUser {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  birthday: string | null
  height: number | null
  weight: number | null
  city: string | null
  state: string | null
  countryCode: string | null
  createdAt: string
  updatedAt: string | null
}

export interface UserLabeled {
  id: string
  userName: string

  firstName: string
  lastName: string
}

export interface UserLabeledWithPhoto extends UserLabeled {
  photo: PeakFile | null
}
