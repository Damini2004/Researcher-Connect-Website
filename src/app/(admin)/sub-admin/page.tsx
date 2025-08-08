// src/app/(admin)/sub-admin/page.tsx
"use client";

import JournalSubmissionsTable from "@/components/tables/journal-submissions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paper Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new and re-submitted manuscripts.</p>
      </div>
      <Tabs defaultValue="verification" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="verification">Submissions for Verification</TabsTrigger>
          <TabsTrigger value="re-verification">Re-Verification</TabsTrigger>
        </TabsList>
        <TabsContent value="verification">
            <JournalSubmissionsTable submissionType="new" />
        </TabsContent>
        <TabsContent value="re-verification">
            <JournalSubmissionsTable submissionType="re-verification" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
