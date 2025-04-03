import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import { ROUTE } from '@/constants/routes'
import { privateRoute } from '@/routing/privateRoute'
import { publicRoute } from '@/routing/publicRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.LOGIN} element={publicRoute(<LoginPage />)} />
        <Route path={ROUTE.HOME} element={privateRoute(<HomePage />)} />
      </Routes>
    </BrowserRouter>
  )
}
