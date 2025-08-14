// src/app/(admin)/sub-admin/journal-submissions/page.tsx
"use client";

import * as React from "react";
import JournalSubmissionsTable from "@/components/tables/journal-submissions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getSubmissions, type Submission } from "@/services/submissionService";
import { getSubAdminByEmail } from "@/services/subAdminService";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalSubmissionsPage() {
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchSubmissions = React.useCallback(async () => {
    setIsLoading(true);
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
        setSubmissions(data.filter(s => s.submissionType === 'journal'));
    } catch (error) {
        toast({
            title: "Error fetching submissions",
            description: "Could not retrieve journal submissions.",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  }, [toast]);
  
  React.useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const newSubmissions = submissions.filter(s => s.status === 'Verification Pending');
  const reSubmissions = submissions.filter(s => s.status === 'Re-Verification Pending');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Journal Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new and re-submitted manuscripts for journals.</p>
      </div>
      <Tabs defaultValue="verification" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="verification" className="flex items-center gap-2">
            New Submissions
            {isLoading ? <Skeleton className="h-5 w-5 rounded-full" /> : <Badge variant="secondary">{newSubmissions.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="re-verification" className="flex items-center gap-2">
            Re-Submissions
            {isLoading ? <Skeleton className="h-5 w-5 rounded-full" /> : <Badge variant="secondary">{reSubmissions.length}</Badge>}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="verification">
            <JournalSubmissionsTable 
              submissions={newSubmissions} 
              isLoading={isLoading} 
              onDataChange={fetchSubmissions} 
            />
        </TabsContent>
        <TabsContent value="re-verification">
            <JournalSubmissionsTable 
              submissions={reSubmissions} 
              isLoading={isLoading}
              onDataChange={fetchSubmissions}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}
