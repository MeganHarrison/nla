'use client';

import * as React from 'react';
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { createClient } from '@/lib/supabase/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const defaultUser = {
  name: 'Alleato',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Business Expert',
      url: '/openai',
      icon: ListIcon,
    },
    {
      title: 'Notion',
      url: '/agents/notion',
      icon: BarChartIcon,
    },
    {
      title: 'Doc Expert',
      url: '/agents/crawl',
      icon: BarChartIcon,
    },
    {
      title: 'MCP',
      url: '/agents/mcp',
      icon: BarChartIcon,
    },
    {
      title: 'Pydantic AI',
      url: '/agents/pydantic-ai',
      icon: BarChartIcon,
    },
    {
      title: 'N8N',
      url: '/agents/n8n',
      icon: BarChartIcon,
    },
    {
      title: 'Projects',
      url: '/tables/projects',
      icon: FolderIcon,
    },
    {
      title: 'Team',
      url: '/tables/employees',
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileTextIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/openai',
      icon: SettingsIcon,
    },
    {
      title: "SOP's",
      url: '#',
      icon: HelpCircleIcon,
    },
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: 'Projects',
      url: '/tables/projects',
      icon: DatabaseIcon,
    },
    {
      name: 'Tasks',
      url: '/tables/tasks',
      icon: ClipboardListIcon,
    },
    {
      name: 'Clients',
      url: '/tables/clients',
      icon: FileIcon,
    },
    {
      name: 'Documents',
      url: '/tables/documents',
      icon: FileIcon,
    },
    {
      name: 'CC Transactions',
      url: '/tables/clients',
      icon: FileIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState(defaultUser);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          name:
            data.user.user_metadata?.full_name ??
            data.user.email ??
            defaultUser.name,
          email: data.user.email ?? defaultUser.email,
          avatar: data.user.user_metadata?.avatar_url ?? defaultUser.avatar,
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">{user.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
