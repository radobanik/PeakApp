import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import PeakAppLogo from '@/assets/PeakAppLogo.png'
import { useContext } from 'react'
import { ViewportContext } from '@/App'
import { ROUTE } from '@/constants/routes'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useIsAdminQuery } from '@/services/queryHooks'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { useNotificationContext } from '@/providers/NotificationProvider'

type SidebarItem = {
  title: string
  url: string
  isActive?: boolean
}

type SidebarSection = {
  title: string
  url?: string
  items?: SidebarItem[]
}

export type SidebarLayoutProps = {
  version?: string
  sections: SidebarSection[]
} & React.ComponentProps<typeof Sidebar>

export function SidebarLayout({ sections, ...props }: SidebarLayoutProps) {
  const { isMobile } = useContext(ViewportContext)
  const { unreadCount } = useNotificationContext()
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()
  const isAdmin = useIsAdminQuery().data

  const filteredSections = sections.filter((section) => section.title !== 'Backoffice' || isAdmin)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Sidebar collapsible={isMobile ? 'offcanvas' : 'none'} variant="sidebar" {...props}>
      <SidebarHeader className="md:hidden w-full">
        {/* TODO: Switch logo based on light/dark theme */}
        <img src={PeakAppLogo} alt="PeakApp Logo" className="w-[80%]" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {filteredSections.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton asChild>
                  <p className="font-medium">{section.title}</p>
                </SidebarMenuButton>
                {section.items?.length ? (
                  <SidebarMenuSub className="ml-4 border-l-2 border-sidebar-border pl-2">
                    {section.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <Link
                            to={subItem.url}
                            onClick={toggleSidebar}
                            className="flex items-center gap-1 relative"
                          >
                            <span>{subItem.title}</span>
                            {subItem.url === ROUTE.SETTINGS_NOTIFICATIONS && unreadCount > 0 && (
                              <span className="ml-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md translate-y-[2px]">
                                {unreadCount > 9 ? '9+' : unreadCount}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="self-end mr-2">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}
