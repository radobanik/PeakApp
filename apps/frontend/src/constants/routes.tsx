export const ROUTE = {
  HOME: '/',
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
}

export const SIDEBAR_ROUTES = [
  {
    title: 'Settings',
    items: [
      { title: 'User', url: ROUTE.SETTINGS_USER },
      { title: 'Routes', url: ROUTE.SETTINGS_ROUTES },
    ],
  },
]
