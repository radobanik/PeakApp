import { API } from '@/constants/api'
import { api } from './index'
import { GradeDetail } from '@/types/gradeTypes'

export async function getAllGrades(): Promise<GradeDetail[]> {
  const response = await api.get(API.GRADE.LIST())
  if (response.status != 200) {
    const error = new Error('Error')
    throw error
  }
  return response.data
}
