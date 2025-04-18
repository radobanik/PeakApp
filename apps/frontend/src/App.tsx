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
import { createContext, useEffect, useState } from 'react'
import PageFrame from './components/PageFrame'

type ViewportContextType = {
  isMobile: boolean
}

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
            <Route path={ROUTE.DETAIL} element={privateRoute(<RouteDetailPage />)} />
          </Route>
        </Routes>

        <Toaster position="top-center" />
      </BrowserRouter>
    </ViewportContext.Provider>
  )
}
