import AdminHeader from "@/components/layout/admin-header";
import SuperAdminSidebar from "@/components/layout/super-admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { getNewInquiryCount } from "@/services/inquiryService";
import { getPendingEnquiryCount } from "@/services/enquiryService";


export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newInquiries = await getNewInquiryCount();
  const newEnquiries = await getPendingEnquiryCount();

  return (
    <>
      <SuperAdminSidebar pendingInquiriesCount={newInquiries} pendingEnquiriesCount={newEnquiries} />
      <div className="flex flex-col w-full">
        <AdminHeader role="super-admin" />
        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </>
  );
}
