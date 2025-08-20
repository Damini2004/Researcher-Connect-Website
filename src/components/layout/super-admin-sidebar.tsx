// src/components/layout/super-admin-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuBadge
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { LogOut, Settings, LayoutTemplate, Presentation, Tv, Newspaper, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SuperAdminSidebarProps {
  pendingEnquiriesCount?: number;
}

const menuItems = [
  { href: "/super-admin/cms-pages", label: "CMS Pages", icon: LayoutTemplate },
  { href: "/super-admin/conferences", label: "Conferences", icon: Presentation },
  { href: "/super-admin/webinars", label: "Webinars", icon: Tv },
  { href: "/super-admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/super-admin/internships", label: "Internships", icon: Briefcase },
  { href: "/super-admin/settings", label: "Settings", icon: Settings },
];

export default function SuperAdminSidebar({ pendingEnquiriesCount = 0 }: SuperAdminSidebarProps) {
  const pathname = usePathname();
  const badgeClass = "bg-red-500 text-white";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="text-lg font-semibold">Researcher Connect</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                  {item.badgeId === 'enquiries' && pendingEnquiriesCount > 0 && (
                    <SidebarMenuBadge className={badgeClass}>{pendingEnquiriesCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/">
          <SidebarMenuButton icon={<LogOut />} tooltip="Logout">Logout</SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
