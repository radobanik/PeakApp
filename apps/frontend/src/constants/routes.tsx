export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DIARY: '/diary',
  ACTIVITIES: '/activities',
  SESSIONS: '/sessions',

  DETAIL: '/detail',
  SUBMIT: '/submit',
  SETTINGS: '/settings',

  COMMUNITY: '/community',

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
