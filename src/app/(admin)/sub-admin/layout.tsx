import AdminHeader from "@/components/layout/admin-header";
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
        <div className="flex flex-col h-full">
          <AdminHeader role="sub-admin" />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
