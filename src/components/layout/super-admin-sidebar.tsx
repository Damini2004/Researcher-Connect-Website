
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
import { Users, BookCopy, LogOut, HelpCircle, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SuperAdminSidebarProps {
  pendingEnquiriesCount?: number;
}

const menuItems = [
  { href: "/super-admin/sub-admins", label: "Sub Admins", icon: Users },
  { href: "/super-admin/journals", label: "Journal List", icon: BookCopy },
  { href: "/super-admin/internships", label: "Internships", icon: Briefcase },
  { href: "/super-admin/enquiries", label: "Admin Enquiries", icon: HelpCircle, badgeId: "enquiries" },
];

export default function SuperAdminSidebar({ pendingEnquiriesCount = 0 }: SuperAdminSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">JournalEdge</span>
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
                >
                  {item.label}
                  {item.badgeId === 'enquiries' && pendingEnquiriesCount > 0 && (
                    <SidebarMenuBadge>{pendingEnquiriesCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/">
          <SidebarMenuButton icon={<LogOut />}>Logout</SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
