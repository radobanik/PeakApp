import { ROUTE } from '@/constants/routes'
import { ElementType, memo } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import diddyPfp from '@/assets/diddy.webp'
import MapIcon from './svg/MapIcon'
import CommunityIcon from './svg/CommunityIcon'
import DiaryIcon from './svg/DiaryIcon'
import { useSidebar } from './ui/sidebar'

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
      <Avatar className="h-full flex justify-center items-center ">
        {/* TODO:: Add user photo and AvatarFallback with user initials */}
        <AvatarImage src={diddyPfp} className="h-full rounded-full"></AvatarImage>
      </Avatar>
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
