"use client"

import * as React from "react"
import {
  Building,
  CircleCheckBig,
  CircleDollarSign,
  Home,
  LayoutDashboard,
  LifeBuoy,
  NotebookPen,
  Search,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  items: [
    {
      title: "Dashboard",
      url: "",
      icon: LayoutDashboard,
    },
    {
      title: "My Tasks",
      url: "/tasks",
      icon: CircleCheckBig,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Startup",
      url: "/startup",
      icon: SquareTerminal
    },
    {
      name: "Self Learning",
      url: "/self-learning",
      icon: NotebookPen
    },
    {
      name: "Office",
      url: "/office",
      icon: Building,
    },
    {
      name: "Freelancing",
      url: "/freelancing",
      icon: CircleDollarSign
    },
    {
      name: "Home",
      url: "/home",
      icon: Home,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CircleCheckBig className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Taskster</span>
                  <span className="truncate text-xs">Tanish Workspace</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
      <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
