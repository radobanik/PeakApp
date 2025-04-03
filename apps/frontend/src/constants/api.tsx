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
}
