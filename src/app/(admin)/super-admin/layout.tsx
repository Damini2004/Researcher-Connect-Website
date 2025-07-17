import AdminHeader from "@/components/layout/admin-header";
import SuperAdminSidebar from "@/components/layout/super-admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SuperAdminSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <AdminHeader role="super-admin" />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
