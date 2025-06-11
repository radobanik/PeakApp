import { API_BASE_URL } from '@/lib/env'

export const API = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    IS_EMAIL_UNIQUE: `${API_BASE_URL}/auth/is-email-unique`,
    IS_USERNAME_UNIQUE: `${API_BASE_URL}/auth/is-username-unique`,
  },
  USER: {
    LIST: () => `${API_BASE_URL}/user/`,
    BY_ID: (id: string) => `${API_BASE_URL}/user/${id}`,
    BASE: `${API_BASE_URL}/user`,
    UPDATE: `${API_BASE_URL}/user/`,
    IS_ADMIN: () => `${API_BASE_URL}/user/role/admin`,
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
  CLIMBING_OBJECT: {
    LIST: `${API_BASE_URL}/climbing-object/`,
    BY_ID: `${API_BASE_URL}/climbing-object/`,
    CREATE: `${API_BASE_URL}/climbing-object/`,
    APPROVAL: (id: string) => `${API_BASE_URL}/climbing-object/${id}/approval`,
  },
  ROUTE: {
    LIST: `${API_BASE_URL}/route/`,
    BY_ID: `${API_BASE_URL}/route/`,
    CREATE: `${API_BASE_URL}/route/`,
    APPROVAL: (id: string) => `${API_BASE_URL}/route/${id}/approval`,
  },
  REVIEW: {
    LIST: (routeId: string) => `${API_BASE_URL}/review/${routeId}`,
    GET_MINE: (routeId: string) => `${API_BASE_URL}/review/${routeId}/me`,
    CREATE: (routeId: string) => `${API_BASE_URL}/review/${routeId}/me`,
    UPDATE: (routeId: string) => `${API_BASE_URL}/review/${routeId}/me`,
    DELETE_MINE: (routeId: string) => `${API_BASE_URL}/review/${routeId}/me`,
  },
  GRADE: {
    LIST: () => `${API_BASE_URL}/grade`,
  },
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
  REPORT: {
    BY_ID: (id: string) => `${API_BASE_URL}/report/${id}`,
    LIST: () => `${API_BASE_URL}/report/`,
    CREATE: () => `${API_BASE_URL}/report/`,
    RESOLVE: (id: string) => `${API_BASE_URL}/report/${id}/resolve`,
    USER_PENDING: () => `${API_BASE_URL}/report/user-pending`,
  },
  NOTIFICATIONS: {
    LIST_AS_READ: () => `${API_BASE_URL}/notifications/read`,
    UNREAD_COUNT: () => `${API_BASE_URL}/notifications/unread/count`,
    SETTINGS: () => `${API_BASE_URL}/notification-settings`,
  },
  SEARCH: {
    BY_TOKEN: () => `${API_BASE_URL}/search/`,
  },
  EMAIL: {
    TEST: `${API_BASE_URL}/email/test/`,
  },
  ACHIEVEMENT: {
    BY_USER: (userId: string) => `${API_BASE_URL}/achievement/user/${userId}`,
    ALL: () => `${API_BASE_URL}/achievement/`,
    CREATE: () => `${API_BASE_URL}/achievement/`,
    UPDATE: (id: string) => `${API_BASE_URL}/achievement/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/achievement/${id}`,
  },
  FEATURE_FLAGS: {
    LIST: () => `${API_BASE_URL}/feature-flags`,
  },
}
