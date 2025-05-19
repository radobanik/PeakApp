import config from '../../core/config'
import {
  toNotNullListParams,
  IncommingListParams,
  NonNullListParams,
  validateListParams,
} from '../common/listParams'

type UserList = {
  id: string
  userName: string
  email: string

  firstName: string
  lastName: string

  profilePictureId: string | null
}

const selector = {
  id: true,
  userName: true,
  email: true,

  firstName: true,
  lastName: true,

  profilePictureId: true,
}

type IncommingUserListParams = {
  firstName: string | null
  lastName: string | null
  email: string | null
} & IncommingListParams

type NonNullUserListParams = {
  firstName: string
  lastName: string
  email: string
} & NonNullListParams

const validSortFields = ['firstName', 'lastName', 'email']

const validateUserListParams = (params: NonNullUserListParams) => {
  validateListParams(params, validSortFields)
}

const defaultUserListParams = (params: IncommingUserListParams): NonNullUserListParams => {
  const { firstName, lastName, email, ...listParams } = params
  return {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    ...toNotNullListParams(listParams, config.LIST_LIMIT.USER),
  }
}

export type { UserList, IncommingUserListParams, NonNullUserListParams }
export { selector, validateUserListParams, defaultUserListParams }
