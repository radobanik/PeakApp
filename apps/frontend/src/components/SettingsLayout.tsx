import { Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { SIDEBAR_ROUTES } from '@/constants/routes'

export function SettingsLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const currentSettingsPageTitle =
    SIDEBAR_ROUTES.flatMap((section) => section.items).find((item) => item.url === currentPath)
      ?.title || 'Settings'

  return (
    <>
      <div className="hidden md:flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>{currentSettingsPageTitle}</Breadcrumb>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-scroll">
        <Outlet />
      </div>
    </>
  )
}
