import SubAdminSidebar from "@/components/layout/sub-admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubAdminSidebar />
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </>
  );
}
