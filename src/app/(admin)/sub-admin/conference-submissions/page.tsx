// src/app/(admin)/sub-admin/conference-submissions/page.tsx
"use client";

import ConferenceSubmissionsTable from "@/components/tables/conference-submissions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConferenceSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conference Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new and re-submitted manuscripts for conferences.</p>
      </div>
       <Tabs defaultValue="verification" className="w-full">
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
    </div>
  );
}
