import { API } from '@/constants/api'
import { api } from '.'
import { PeakFile } from '@/types/fileTypes'

const createFile = async (file: File): Promise<PeakFile> => {
  console.log('file', file)
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post(API.PEAK_FILE.CREATE(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

const getFile = async (id: string): Promise<PeakFile> => {
  const response = await api.get(API.PEAK_FILE.BY_ID(id))
  return response.data
}

const deleteFile = async (id: string) => {
  await api.delete(API.PEAK_FILE.DELETE(id))
}

export { createFile, getFile, deleteFile }
