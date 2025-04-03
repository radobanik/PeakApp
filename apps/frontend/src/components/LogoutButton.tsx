import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { navigateToPage } from '@/routing/navigator'
import LoginPage from '@/pages/LoginPage'

export default function LogoutButton() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigateToPage(LoginPage, navigate, {
      requireAuth: false,
      replace: true,
    })
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  )
}
