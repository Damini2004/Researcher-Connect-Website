// src/components/layout/sub-admin-sidebar.tsx
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
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { CheckSquare, MessageSquare, Settings, LogOut, Book, Presentation } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SubAdminSidebarProps {
  journalCount?: number;
  conferenceCount?: number;
  inquiryCount?: number;
}

const menuItems = [
  { href: "/sub-admin/journal-submissions", label: "Journal Submissions", icon: Book, badgeId: "journal" },
  { href: "/sub-admin/conference-submissions", label: "Conference Submissions", icon: Presentation, badgeId: "conference" },
  { href: "/sub-admin/approved", label: "Approved Papers", icon: CheckSquare },
  { href: "/sub-admin/inquiries", label: "Inquiries", icon: MessageSquare, badgeId: "inquiries" },
  { href: "/sub-admin/settings", label: "Profile Settings", icon: Settings },
];

export default function SubAdminSidebar({ journalCount = 0, conferenceCount = 0, inquiryCount = 0 }: SubAdminSidebarProps) {
  const pathname = usePathname();

  const badgeClass = "bg-red-500 text-white";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="text-lg font-semibold">Pure Research Insights</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isActive}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                    {item.badgeId === 'journal' && journalCount > 0 && (
                        <SidebarMenuBadge className={badgeClass}>{journalCount}</SidebarMenuBadge>
                    )}
                    {item.badgeId === 'conference' && conferenceCount > 0 && (
                        <SidebarMenuBadge className={badgeClass}>{conferenceCount}</SidebarMenuBadge>
                    )}
                     {item.badgeId === 'inquiries' && inquiryCount > 0 && (
                        <SidebarMenuBadge className={badgeClass}>{inquiryCount}</SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
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
