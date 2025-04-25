import { Outlet, useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarLayout } from './SideBarLayout'
import { ROUTE } from '@/constants/routes'

const settingsNav = [
  {
    title: 'Main',
    url: '#',
    items: [
      { title: 'User', url: ROUTE.SETTINGS_USER },
      { title: 'Routes', url: ROUTE.SETTINGS_ROUTES },
    ],
  },
  {
    title: 'Obdobne',
    url: '#',
    items: [
      { title: 'Dalsie', url: '#' },
      { title: 'Picoviny', url: '#' },
      { title: 'SMH', url: '#' },
    ],
  },
]

export function SettingsLayout() {
  const location = useLocation()

  const getTitleFromRoute = () => {
    for (const section of settingsNav) {
      for (const item of section.items || []) {
        if (item.url === location.pathname) {
          return item.title
        }
      }
    }
    return 'Select a View'
  }

  const selectedOption = getTitleFromRoute()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <SidebarLayout logoTitle="PeakApp Navigation" sections={settingsNav} className="mt-14" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedOption}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
