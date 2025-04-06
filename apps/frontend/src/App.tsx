import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import { ROUTE } from '@/constants/routes'
import { privateRoute } from '@/routing/privateRoute'
import { publicRoute } from '@/routing/publicRoute'
import { Toaster } from '@/components/ui/sonner'
import RouteDetailPage from './pages/RouteDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.LOGIN} element={publicRoute(<LoginPage />)} />
        <Route path={ROUTE.REGISTER} element={publicRoute(<RegisterPage />)} />
        <Route path={ROUTE.HOME} element={privateRoute(<HomePage />)} />
        <Route path="/detail" element={privateRoute(<RouteDetailPage />)} />
      </Routes>

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}
