import { ROUTE } from '@/constants/routes'
import PeakAppLogo from '../assets/PeakAppLogo.png'
import LogoutButton from './LogoutButton'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import diddyPfp from '@/assets/diddy.webp'
import { useSidebar } from './ui/sidebar'
import { useNotificationContext } from '@/App'

function HeaderBar() {
  const navigate = useNavigate()
  const { setOpen } = useSidebar()
  const { unreadCount } = useNotificationContext()

  const handleProfileClick = () => {
    navigate(ROUTE.SETTINGS_USER)
    setOpen(true)
  }

  return (
    <div className="flex justify-start w-full h-14 px-3 py-1 border-b-2 border-gray-300 bg-background-menu">
      <Link to={ROUTE.HOME} onClick={() => setOpen(false)} className="flex items-center h-full">
        <img src={PeakAppLogo} alt="Logo" className="h-12 mr-4" />
      </Link>
      <nav className="flex-1 flex justify-end items-center h-full space-x-10">
        <Link to={ROUTE.DIARY} onClick={() => setOpen(false)} className="text-lg font-semibold">
          My Diary
        </Link>
        <Link to={ROUTE.COMMUNITY} onClick={() => setOpen(false)} className="text-lg font-semibold">
          Community
        </Link>
        <LogoutButton />

        <div
          onClick={handleProfileClick}
          className="relative h-full flex items-center justify-center"
        >
          <Avatar className="h-full flex justify-center items-center">
            {/* TODO:: Add user photo and AvatarFallback with user initials */}
            <AvatarImage src={diddyPfp} className="h-full rounded-full" />
          </Avatar>

          {unreadCount > 0 && (
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-[-25%] bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md z-50">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default HeaderBar
