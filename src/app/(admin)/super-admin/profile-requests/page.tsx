
// src/app/(admin)/super-admin/profile-requests/page.tsx
"use client";

import AdminEnquiryTable from "@/components/tables/admin-enquiry-table";

export default function ProfileRequestsPage() {
  return (
    <div className="space-y-6">
      <AdminEnquiryTable />
    </div>
  );
}
