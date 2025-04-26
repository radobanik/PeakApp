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

import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import SubmitPage from './pages/SubmitPage'
import { createContext, useEffect, useState } from 'react'
import PageFrame from './components/PageFrame'

type ViewportContextType = {
  isMobile: boolean
}

const queryClient = new QueryClient()
export const ViewportContext = createContext<ViewportContextType>({ isMobile: true })

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

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
              <Route path={ROUTE.DETAIL} element={privateRoute(<RouteDetailPage />)} />
              <Route path={ROUTE.SUBMIT} element={privateRoute(<SubmitPage />)} />
            </Route>
          </Routes>

          {/* Toast notifications */}
          <Toaster position="top-center" />
        </BrowserRouter>
      </ViewportContext.Provider>
    </QueryClientProvider>
  )
}
