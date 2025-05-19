import { API } from '@/constants/api'
import { api } from '.'
import { ReviewCreate, ReviewDetail, ReviewUpdate } from '@/types/reviewTypes'

export const getReviews = async (routeId: string): Promise<ReviewDetail[]> => {
  const response = await api.get(API.REVIEW.LIST(routeId))
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const getUserReview = async (routeId: string): Promise<ReviewDetail> => {
  const response = await api.get(API.REVIEW.GET_MINE(routeId))
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const createReview = async (routeId: string, data: ReviewCreate): Promise<ReviewDetail> => {
  const response = await api.post(API.REVIEW.CREATE(routeId), data)
  if (response.status != 201) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}

export const updateReview = async (routeId: string, data: ReviewUpdate): Promise<ReviewDetail> => {
  const response = await api.patch(API.REVIEW.UPDATE(routeId), data)
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}
