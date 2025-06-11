import { API } from '@/constants/api'
import { api } from './index'
import { UserDetailResponse, UserUpdateRequest, IsAdminReponse } from '@/types/userTypes'
import { PaginatedResponse } from '@/types'
import { UserList } from '@/types/userTypes'

export async function getUser(userId: string): Promise<UserDetailResponse> {
  try {
    const response = await api.get(API.USER.BY_ID(userId))
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getLoggedInUser(): Promise<UserDetailResponse> {
  try {
    const response = await api.get(API.USER.BASE)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getIsAdmin(): Promise<IsAdminReponse> {
  try {
    const response = await api.get(API.USER.IS_ADMIN())
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateUser(
  userId: string,
  data: UserUpdateRequest
): Promise<UserDetailResponse> {
  try {
    const response = await api.put(`${API.USER.BASE}/${userId}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateLoggedInUser(data: UserUpdateRequest): Promise<UserDetailResponse> {
  try {
    const response = await api.put(API.USER.BASE, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getUsers(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<UserList>> {
  try {
    const response = await api.get(API.USER.LIST(), {
      params: {
        page,
        pageSize,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
