import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import PeakAppLogo from '@/assets/PeakAppLogo.png'
import { useContext } from 'react'
import { ViewportContext } from '@/App'

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
  return (
    <Sidebar collapsible={isMobile ? 'offcanvas' : 'none'} variant="sidebar" {...props}>
      <SidebarHeader className="md:hidden w-full">
        {/* TODO: Switch logo based on light/dark theme */}
        <img src={PeakAppLogo} alt="PeakApp Logo" className="w-[80%]" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {sections.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton asChild>
                  <a href={section.url} className="font-medium">
                    {section.title}
                  </a>
                </SidebarMenuButton>
                {section.items?.length ? (
                  <SidebarMenuSub className="ml-4 border-l-2 border-sidebar-border pl-2">
                    {section.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <a href={subItem.url}>{subItem.title}</a>
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
    </Sidebar>
  )
}
