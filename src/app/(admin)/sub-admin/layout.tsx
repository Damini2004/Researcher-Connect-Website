// src/app/(admin)/sub-admin/layout.tsx
'use client';

import * as React from 'react';
import AdminHeader from "@/components/layout/admin-header";
import SubAdminSidebar from "@/components/layout/sub-admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { getSubmissions } from '@/services/submissionService';
import { getSubAdminByEmail } from '@/services/subAdminService';
import { useToast } from '@/hooks/use-toast';

export default function SubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [journalCount, setJournalCount] = React.useState(0);
  const [conferenceCount, setConferenceCount] = React.useState(0);
  const { toast } = useToast();

  const fetchCounts = React.useCallback(async () => {
    try {
      let subAdminId: string | undefined = undefined;
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('currentUserEmail');
        if (email) {
          const result = await getSubAdminByEmail(email);
          if (result.success && result.subAdmin) {
            subAdminId = result.subAdmin.id;
          }
        }
      }
      const data = await getSubmissions({ subAdminId });
      const pendingStatuses = ['Verification Pending', 'Re-Verification Pending'];
      
      const journals = data.filter(s => s.submissionType === 'journal' && pendingStatuses.includes(s.status));
      const conferences = data.filter(s => s.submissionType === 'conference' && pendingStatuses.includes(s.status));

      setJournalCount(journals.length);
      setConferenceCount(conferences.length);
    } catch (error) {
      toast({
        title: "Error fetching counts",
        description: "Could not retrieve submission counts for the sidebar.",
        variant: "destructive"
      });
    }
  }, [toast]);

  React.useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);


  return (
    <>
      <SubAdminSidebar journalCount={journalCount} conferenceCount={conferenceCount} />
      <div className="flex flex-col w-full">
        <AdminHeader role="sub-admin" />
        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </>
  );
}
