
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
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { FileText, CheckSquare, MessageSquare, Settings, LogOut, Book, Presentation } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/sub-admin/journal-submissions", label: "Journal Submissions", icon: Book },
  { href: "/sub-admin/conference-submissions", label: "Conference Submissions", icon: Presentation },
  { href: "/sub-admin/approved", label: "Approved Papers", icon: CheckSquare },
  { href: "/sub-admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/sub-admin/settings", label: "Profile Settings", icon: Settings },
];

export default function SubAdminSidebar() {
  const pathname = usePathname();

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
