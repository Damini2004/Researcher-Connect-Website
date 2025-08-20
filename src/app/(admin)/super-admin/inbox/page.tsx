// src/app/(admin)/super-admin/inbox/page.tsx
"use client";

import InquiriesTable from "@/components/tables/inquiries-table";

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <InquiriesTable />
    </div>
  );
}
