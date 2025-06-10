import { ROUTE } from '@/constants/routes'
import { ElementType, memo } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import MapIcon from './svg/MapIcon'
import CommunityIcon from './svg/CommunityIcon'
import DiaryIcon from './svg/DiaryIcon'
import { useSidebar } from './ui/sidebar'
import { useNotificationContext } from '@/App'
import { useProfilePictureQuery } from '@/services/queryHooks'

const MENU_ICON_BUTTONS = [
  {
    title: 'Map',
    icon: MapIcon,
    route: ROUTE.HOME,
  },
  {
    title: 'Diary',
    icon: DiaryIcon,
    route: ROUTE.DIARY,
  },
  {
    title: 'Community',
    icon: CommunityIcon,
    route: ROUTE.COMMUNITY,
  },
]

const MobileMenuHeader = () => {
  const { toggleSidebar } = useSidebar()
  const { unreadCount } = useNotificationContext()
  const { data: profilePictureUrl } = useProfilePictureQuery()

  const renderMenuButton = ({
    title,
    icon: SVGIcon,
    route,
  }: {
    title: string
    icon: ElementType
    route: string
  }) => {
    return (
      <Link
        to={route}
        key={title}
        className="flex flex-1 justify-center items-center h-full px-2 py-1 gap-1"
      >
        <SVGIcon size="calc(var(--spacing) * 8)" />
        <Button variant="ghost" className="flex h-full p-0 cursor-pointer">
          {title}
        </Button>
      </Link>
    )
  }

  const renderProfileButton = () => (
    <div onClick={toggleSidebar} className="flex flex-1 justify-center h-full px-2 py-1">
      <div className="relative h-full aspect-square flex items-center justify-center">
        <Avatar className="h-full aspect-square">
          <AvatarImage
            src={profilePictureUrl}
            className="h-full w-full rounded-full object-cover"
          />
        </Avatar>

        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md z-50">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <nav className="flex h-14  w-full  bg-background-menu">
      {MENU_ICON_BUTTONS.map(renderMenuButton)}
      {renderProfileButton()}
    </nav>
  )
}

export default memo(MobileMenuHeader)
