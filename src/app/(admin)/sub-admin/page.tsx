// src/app/(admin)/sub-admin/page.tsx
"use client";

import ConferenceSubmissionsTable from "@/components/tables/conference-submissions-table";
import JournalSubmissionsTable from "@/components/tables/journal-submissions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paper Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new and re-submitted manuscripts for journals and conferences.</p>
      </div>
      <Tabs defaultValue="journal" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-2">
          <TabsTrigger value="journal">Journal Submissions</TabsTrigger>
          <TabsTrigger value="conference">Conference Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="journal">
          <Tabs defaultValue="verification" className="w-full mt-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="verification">New Submissions</TabsTrigger>
              <TabsTrigger value="re-verification">Re-Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="verification">
                <JournalSubmissionsTable submissionType="new" />
            </TabsContent>
            <TabsContent value="re-verification">
                <JournalSubmissionsTable submissionType="re-verification" />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="conference">
          <Tabs defaultValue="verification" className="w-full mt-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="verification">New Submissions</TabsTrigger>
              <TabsTrigger value="re-verification">Re-Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="verification">
                <ConferenceSubmissionsTable submissionType="new" />
            </TabsContent>
            <TabsContent value="re-verification">
                <ConferenceSubmissionsTable submissionType="re-verification" />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
