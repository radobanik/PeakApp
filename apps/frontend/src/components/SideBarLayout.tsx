import { ComponentType } from 'react'
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

type SidebarItem = {
  title: string
  url: string
  isActive?: boolean
  // component: () => ComponentType
}

type SidebarSection = {
  title: string
  url: string
  items?: SidebarItem[]
}

export type SidebarLayoutProps = {
  logoTitle: string
  version?: string
  sections: SidebarSection[]
} & React.ComponentProps<typeof Sidebar>

export function SidebarLayout({
  logoTitle,
  sections,
  onOptionClick,
  ...props
}: SidebarLayoutProps & { onOptionClick: (component: () => ComponentType) => void }) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="font-semibold">{logoTitle}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {section.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.isActive}
                          onClick={() => onOptionClick(item.component || null)}
                        >
                          <a href={item.url}>{item.title}</a>
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
