
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { Users, BookCopy, LogOut, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/super-admin/sub-admins", label: "Sub Admins", icon: Users },
  { href: "/super-admin/journals", label: "Journal List", icon: BookCopy },
  { href: "/super-admin/enquiries", label: "Admin Enquiries", icon: HelpCircle },
];

export default function SuperAdminSidebar() {
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
