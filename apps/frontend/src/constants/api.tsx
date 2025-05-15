import { API_BASE_URL } from '@/lib/env'

export const API = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    IS_EMAIL_UNIQUE: `${API_BASE_URL}/auth/is-email-unique`,
    IS_USERNAME_UNIQUE: `${API_BASE_URL}/auth/is-username-unique`,
  },
  USER: {
    BASE: `${API_BASE_URL}/user`,
    UPDATE: `${API_BASE_URL}/user/`,
  },
  GEO: {
    COUNTRIES: `${API_BASE_URL}/geo/countries`,
    CITIES: `${API_BASE_URL}/geo/cities`,
  },
  ACTIVITY: {
    LIST: `${API_BASE_URL}/activity/`,
    BY_ID: `${API_BASE_URL}/activity/`,
    CREATE: `${API_BASE_URL}/activity/`,
    UPDATE: `${API_BASE_URL}/activity/`,
    DELETE: `${API_BASE_URL}/activity/`,
  },
  SESSION: {
    LIST: `${API_BASE_URL}/session/`,
    BY_ID: `${API_BASE_URL}/session/`,
    CREATE: `${API_BASE_URL}/session/`,
    UPDATE: `${API_BASE_URL}/session/`,
    DELETE: `${API_BASE_URL}/session/`,
  },
  ROUTE: {
    LIST: `${API_BASE_URL}/route/`,
  },
  CLIMBING_OBJECT: `${API_BASE_URL}/climbing-object`,
  PEAK_FILE: {
    BY_ID: (id: string) => `${API_BASE_URL}/peak-file/${id}`,
    CREATE: () => `${API_BASE_URL}/peak-file`,
    CREATE_EXISTING: () => `${API_BASE_URL}/peak-file/existing`,
    DELETE: (id: string) => `${API_BASE_URL}/peak-file/${id}`,
  },
  COMMUNITY: {
    BY_ID: (id: string) => `${API_BASE_URL}/community/${id}`,
    LIST: () => `${API_BASE_URL}/community/`,
  },
  LIKE: {
    LIKE: (sessionId: string) => `${API_BASE_URL}/like/${sessionId}`,
    UNLIKE: (sessionId: string) => `${API_BASE_URL}/like/${sessionId}`,
  },
  COMMENT: {
    LIST: () => `${API_BASE_URL}/comment/`,
    CREATE: () => `${API_BASE_URL}/comment/`,
    UPDATE: (id: string) => `${API_BASE_URL}/comment/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/comment/${id}`,
  },
}
