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
    LIST_UNASSIGNED: `${API_BASE_URL}/activity/unassigned`,
    BY_ID: `${API_BASE_URL}/activity/`,
    CREATE: `${API_BASE_URL}/activity/`,
    UPDATE: `${API_BASE_URL}/activity/`,
    DELETE: `${API_BASE_URL}/activity/`,
    ASSIGN: `${API_BASE_URL}/activity/assign`,
    UNASSIGN: `${API_BASE_URL}/activity/unassign`,
  },
  SESSION: {
    LIST: `${API_BASE_URL}/session/`,
    LIST_ACTIVITIES: (id: string) => `${API_BASE_URL}/session/${id}/activities`,
    BY_ID: `${API_BASE_URL}/session/`,
    CREATE: `${API_BASE_URL}/session/`,
    UPDATE: `${API_BASE_URL}/session/`,
    DELETE: `${API_BASE_URL}/session/`,
  },
  ROUTE: {
    LIST: `${API_BASE_URL}/route/`,
    BY_ID: `${API_BASE_URL}/route/`,
  },
  CLIMBING_OBJECT: `${API_BASE_URL}/climbing-object`,
  PEAK_FILE: {
    BY_ID: (id: string) => `${API_BASE_URL}/peak-file/${id}`,
    CREATE: () => `${API_BASE_URL}/peak-file`,
    CREATE_EXISTING: () => `${API_BASE_URL}/peak-file/existing`,
    DELETE: (id: string) => `${API_BASE_URL}/peak-file/${id}`,
  },
}
