import { API_BASE_URL } from '@/lib/env'

export const API = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  // Example of API endpoints for user. Need to be updated based on real API
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE: `${API_BASE_URL}/user/update`,
  },
}
