import { ROUTE } from '@/constants/routes'
import PeakAppLogo from '../assets/PeakAppLogo.png'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import diddyPfp from '@/assets/diddy.webp'

function HeaderBar() {

  return (
    <div className="flex justify-start w-full h-14 px-3 py-1 border-b-2 border-gray-300 bg-background-menu">
      <Link to={ROUTE.HOME} className="flex items-center h-full">
        <img src={PeakAppLogo} alt="Logo" className="h-12 mr-4" />
      </Link>
      <nav className="flex-1 flex justify-end items-center h-full space-x-10">
        <Link to={ROUTE.DIARY} className="text-lg font-semibold">
          My Diary
        </Link>
        <Link to={ROUTE.COMMUNITY} className="text-lg font-semibold">
          Community
        </Link>
        <LogoutButton />
        <Link to={ROUTE.SETTINGS} className="flex justify-center h-full">
          <Avatar className="h-full flex justify-center items-center ">
            {/* TODO:: Add user photo and AvatarFallback with user initials */}
            <AvatarImage src={diddyPfp} className="h-full rounded-full"></AvatarImage>
          </Avatar>
        </Link>
      </nav>
    </div>
  )
}

export default HeaderBar
