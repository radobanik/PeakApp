import { API_BASE_URL } from '@/lib/env'

export const API = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    IS_EMAIL_UNIQUE: `${API_BASE_URL}/auth/is-email-unique`,
    IS_USERNAME_UNIQUE: `${API_BASE_URL}/auth/is-username-unique`,
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
}
