import { useState } from 'react'
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
import UserSettings from './UserSettings'
import { Outlet } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'

const settingsNav = [
  {
    title: 'Getting Started',
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
  console.log('Settings component rendered')
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType | null>(null)

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <SidebarLayout
        logoTitle="Settings"
        sections={settingsNav}
        onOptionClick={(component: () => React.ComponentType) => setActiveComponent(component)}
        className="mt-16"
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{ActiveComponent?.name || 'Select a View'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
