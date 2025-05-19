import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import { ROUTE } from '@/constants/routes'
import { privateRoute } from '@/routing/privateRoute'
import { publicRoute } from '@/routing/publicRoute'
import { Toaster } from '@/components/ui/sonner'
import RouteDetailPage from './pages/RouteDetailPage'
import DiaryPage from './pages/DiaryPage'
import ActivitiesPage from './pages/ActivitiesPage'
import SessionsPage from './pages/SessionsPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import SessionDetailPage from './pages/SessionDetailPage'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import SubmitPage from './pages/SubmitPage'
import { createContext, useContext, useEffect, useState } from 'react'
import PageFrame from './components/PageFrame'
import { SettingsLayout } from './components/SettingsLayout'
import UserSettingsPage from './pages/UserSettingsPage'
import UserRoutesPage from './pages/UserRoutesPage'
import { SidebarProvider } from './components/ui/sidebar'
import CommunityPage from './pages/CommunityPageLayout'
import CommunitySessionDetailPage from './pages/CommunitySessionDetailPage'
import ActivityCreatePage from './pages/ActivityCreatePage'
import SessionCreatePage from './pages/SessionCreate'
import { ApprovalProvider } from './components/backoffice/ApprovalProvider'
import ReviewObjectsPage from './pages/Backoffice/ReviewObjectsPage'
import ReviewObjectDetailPage from './pages/Backoffice/ReviewObjectDetailPage'
import ReviewRoutesPage from './pages/Backoffice/ReviewRoutesPage'
import ReviewRouteDetailPage from './pages/Backoffice/ReviewRouteDetailPage'
import AllClimbingObjectList from './pages/Backoffice/AllClimbingObjectList'
import AllRouteList from './pages/Backoffice/AllRouteList'
import AllUserList from './pages/Backoffice/AllUserList'
import Analytics from './pages/Backoffice/Analytics'
import ReportPage from './pages/Backoffice/ReportPage'
import ReportDetailPage from './pages/Backoffice/ReportDetailPage'
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'
import { getUnreadNotificationCount } from './services/notificationService'
import ClimbingObjectDetailPage from './pages/ClimbingObjectDetailPage'

type ViewportContextType = {
  isMobile: boolean
}

type ActivityCreateContextType = {
  routeId: string | null
  setRouteId: (id: string | null) => void
}

type NotificationContextType = {
  unreadCount: number
  refetchUnread: () => void
}

const queryClient = new QueryClient()
export const ViewportContext = createContext<ViewportContextType>({ isMobile: true })
export const ActivityCreateContext = createContext<ActivityCreateContextType>({
  routeId: null,
  setRouteId: () => {},
})
const NotificationContext = createContext<NotificationContextType>({
  unreadCount: 0,
  refetchUnread: () => {},
})

export const useNotificationContext = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }

    window.addEventListener('storage', checkToken)
    return () => window.removeEventListener('storage', checkToken)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const { data = 0, refetch } = useQuery({
    queryKey: ['notification-unread-count'],
    queryFn: getUnreadNotificationCount,
    enabled: isLoggedIn,
    refetchInterval: isLoggedIn ? 5000 : false,
  })

  return (
    <NotificationContext.Provider value={{ unreadCount: data, refetchUnread: refetch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [routeId, setRouteId] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ViewportContext.Provider value={{ isMobile }}>
          <ActivityCreateContext.Provider value={{ routeId, setRouteId }}>
            <SidebarProvider defaultOpen={false}>
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path={ROUTE.LOGIN} element={publicRoute(<LoginPage />)} />
                  <Route path={ROUTE.REGISTER} element={publicRoute(<RegisterPage />)} />

                  {/* Private routes */}
                  <Route element={<PageFrame />}>
                    <Route path={ROUTE.HOME} element={privateRoute(<HomePage />)} />
                    <Route
                      path={ROUTE.ROUTE + '/:routeId'}
                      element={privateRoute(<RouteDetailPage />)}
                    />
                    <Route
                      path={ROUTE.CLIMBING_OBJECT + '/:climbingObjectId'}
                      element={privateRoute(<ClimbingObjectDetailPage />)}
                    />

                    <Route path={ROUTE.DIARY} element={privateRoute(<DiaryPage />)} />
                    <Route path={ROUTE.ACTIVITIES} element={privateRoute(<ActivitiesPage />)} />
                    <Route
                      path={ROUTE.ACTIVITIES + '/:id'}
                      element={privateRoute(<ActivityDetailPage />)}
                    />
                    <Route
                      path={ROUTE.ACTIVITIES_NEW}
                      element={privateRoute(<ActivityCreatePage />)}
                    />
                    <Route path={ROUTE.SESSIONS} element={privateRoute(<SessionsPage />)} />
                    <Route
                      path={ROUTE.SESSIONS + '/:id'}
                      element={privateRoute(<SessionDetailPage />)}
                    />
                    <Route
                      path={ROUTE.SESSIONS_NEW}
                      element={privateRoute(<SessionCreatePage />)}
                    />
                    <Route path={ROUTE.DETAIL} element={privateRoute(<RouteDetailPage />)} />
                    <Route path={ROUTE.COMMUNITY} element={privateRoute(<CommunityPage />)}>
                      <Route
                        path={ROUTE.COMMUNITY + '/:id'}
                        element={privateRoute(<CommunitySessionDetailPage />)}
                      />
                    </Route>
                    <Route path={ROUTE.SUBMIT} element={privateRoute(<SubmitPage />)} />

                    <Route path={ROUTE.SETTINGS} element={privateRoute(<SettingsLayout />)}>
                      <Route
                        path={ROUTE.SETTINGS_USER}
                        element={privateRoute(<UserSettingsPage />)}
                      />
                      <Route
                        path={ROUTE.SETTINGS_ROUTES}
                        element={privateRoute(<UserRoutesPage />)}
                      />
                      <Route
                        path={ROUTE.NEW_CLIMBING_OBJECTS}
                        element={privateRoute(
                          <ApprovalProvider>
                            <ReviewObjectsPage />
                          </ApprovalProvider>
                        )}
                      >
                        <Route
                          path={ROUTE.NEW_CLIMBING_OBJECTS_DETAIL}
                          element={privateRoute(<ReviewObjectDetailPage />)}
                        />
                      </Route>
                      <Route
                        path={ROUTE.NEW_ROUTES}
                        element={privateRoute(
                          <ApprovalProvider>
                            <ReviewRoutesPage />
                          </ApprovalProvider>
                        )}
                      >
                        <Route
                          path={ROUTE.NEW_ROUTES_DETAIL}
                          element={privateRoute(<ReviewRouteDetailPage />)}
                        />
                      </Route>
                      <Route path={ROUTE.REPORTS} element={privateRoute(<ReportPage />)}>
                        <Route
                          path={ROUTE.REPORTS_DETAIL}
                          element={privateRoute(<ReportDetailPage />)}
                        />
                      </Route>
                      <Route
                        path={ROUTE.ALL_CLIMBING_OBJECTS}
                        element={privateRoute(<AllClimbingObjectList />)}
                      >
                        <Route
                          path={ROUTE.ALL_CLIMBING_OBJECTS_DETAIL}
                          element={privateRoute(<div />)}
                        />
                      </Route>
                      <Route path={ROUTE.ALL_ROUTES} element={privateRoute(<AllRouteList />)}>
                        <Route path={ROUTE.ALL_ROUTES_DETAIL} element={privateRoute(<div />)} />
                      </Route>
                      <Route path={ROUTE.ALL_USERS} element={privateRoute(<AllUserList />)}>
                        <Route path={ROUTE.ALL_USERS_DETAIL} element={privateRoute(<div />)} />
                      </Route>
                      <Route path={ROUTE.ANALYTICS} element={privateRoute(<Analytics />)}></Route>
                      <Route
                        path={ROUTE.SETTINGS_NOTIFICATIONS}
                        element={privateRoute(<NotificationsPage />)}
                      />
                    </Route>
                  </Route>
                </Routes>

                {/* Toast notifications */}
                <Toaster position="top-center" />
              </BrowserRouter>
            </SidebarProvider>
          </ActivityCreateContext.Provider>
        </ViewportContext.Provider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}
