import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { navigateToPage } from '@/routing/navigator'
import LoginPage from '@/pages/LoginPage'
import { useQueryClient } from '@tanstack/react-query'

export default function LogoutButton() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    queryClient.resetQueries()

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
