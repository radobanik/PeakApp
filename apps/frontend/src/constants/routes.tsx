export const ROUTE = {
  HOME: '/',
  CLIMBING_OBJECT: '/climbing-object',
  ROUTE: '/route',

  LOGIN: '/login',
  REGISTER: '/register',
  DIARY: '/diary',
  ACTIVITIES: '/activities',
  ACTIVITIES_NEW: '/activities/new',
  SESSIONS: '/sessions',
  SESSIONS_NEW: '/sessions/new',

  DETAIL: '/detail',
  SUBMIT: '/submit',
  SETTINGS: '/settings',

  COMMUNITY: '/community',
  COMMUNITY_DETAIL: (id: string) => `/community/${id}`,

  SETTINGS_USER: '/settings/user',
  SETTINGS_ROUTES: '/settings/routes',

  NEW_ROUTES: '/settings/new-routes',
  NEW_ROUTES_DETAIL: '/settings/new-routes/:id',
  NEW_CLIMBING_OBJECTS: '/settings/new-climbing-objects',
  NEW_CLIMBING_OBJECTS_DETAIL: '/settings/new-climbing-objects/:id',

  REPORTS: '/settings/reports',
  REPORTS_DETAIL: '/settings/reports/:id',

  ALL_CLIMBING_OBJECTS: '/settings/all-climbing-objects',
  ALL_CLIMBING_OBJECTS_DETAIL: '/settings/all-climbing-objects/:id',
  ALL_ROUTES: '/settings/all-routes',
  ALL_ROUTES_DETAIL: '/settings/all-routes/:id',
  ALL_USERS: '/settings/all-users',
  ALL_USERS_DETAIL: '/settings/all-users/:id',
  ANALYTICS: '/settings/analytics',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',

  ALL_ACHIEVEMENTS: '/settings/achievements',
}

export const SIDEBAR_ROUTES = [
  {
    title: 'Settings',
    items: [
      { title: 'User', url: ROUTE.SETTINGS_USER },
      { title: 'Routes', url: ROUTE.SETTINGS_ROUTES },
    ],
  },
  {
    title: 'Backoffice',
    items: [
      { title: 'Review new objects', url: ROUTE.NEW_CLIMBING_OBJECTS },
      { title: 'Review new routes', url: ROUTE.NEW_ROUTES },
      { title: 'Review reports', url: ROUTE.REPORTS },
      { title: 'All objects', url: ROUTE.ALL_CLIMBING_OBJECTS },
      { title: 'All routes', url: ROUTE.ALL_ROUTES },
      { title: 'All users', url: ROUTE.ALL_USERS },
      { title: 'All achievements', url: ROUTE.ALL_ACHIEVEMENTS },
      { title: 'Analytics', url: ROUTE.ANALYTICS },
      { title: 'Notifications', url: ROUTE.SETTINGS_NOTIFICATIONS },
    ],
  },
]
