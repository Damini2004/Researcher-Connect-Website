
import AdminEnquiryTable from "@/components/tables/admin-enquiry-table";

export default function AdminEnquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Enquiries</h1>
        <p className="text-muted-foreground">
          Review and approve profile update requests from sub-administrators.
        </p>
      </div>
      <AdminEnquiryTable />
    </div>
  );
}
