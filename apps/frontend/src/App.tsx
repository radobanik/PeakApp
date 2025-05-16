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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import SubmitPage from './pages/SubmitPage'
import { createContext, useEffect, useState } from 'react'
import PageFrame from './components/PageFrame'
import { SettingsLayout } from './components/SettingsLayout'
import UserSettingsPage from './pages/UserSettingsPage'
import UserRoutesPage from './pages/UserRoutesPage'
import { SidebarProvider } from './components/ui/sidebar'
import ActivityCreatePage from './pages/ActivityCreatePage'
import SessionCreatePage from './pages/SessionCreate'

type ViewportContextType = {
  isMobile: boolean
}

type ActivityCreateContextType = {
  routeId: string | null
  setRouteId: (id: string | null) => void
}

const queryClient = new QueryClient()
export const ViewportContext = createContext<ViewportContextType>({ isMobile: true })
export const ActivityCreateContext = createContext<ActivityCreateContextType>({
  routeId: null,
  setRouteId: () => {},
})

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
                  <Route path={ROUTE.SESSIONS_NEW} element={privateRoute(<SessionCreatePage />)} />
                  <Route path={ROUTE.DETAIL} element={privateRoute(<RouteDetailPage />)} />
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
                  </Route>
                </Route>
              </Routes>

              {/* Toast notifications */}
              <Toaster position="top-center" />
            </BrowserRouter>
          </SidebarProvider>
        </ActivityCreateContext.Provider>
      </ViewportContext.Provider>
    </QueryClientProvider>
  )
}
