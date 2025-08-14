// src/app/(admin)/sub-admin/conference-submissions/page.tsx
"use client";

import * as React from "react";
import ConferenceSubmissionsTable from "@/components/tables/conference-submissions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getSubmissions, type Submission } from "@/services/submissionService";
import { getSubAdminByEmail } from "@/services/subAdminService";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConferenceSubmissionsPage() {
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchSubmissions = async () => {
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
        setSubmissions(data.filter(s => s.submissionType === 'conference'));
      } catch (error) {
        toast({
            title: "Error fetching submissions",
            description: "Could not retrieve conference submissions.",
            variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, [toast]);

  const newSubmissions = submissions.filter(s => s.status === 'Verification Pending');
  const reSubmissions = submissions.filter(s => s.status === 'Re-Verification Pending');

  const handleDataChange = () => {
    // A simple way to trigger a re-fetch in the child tables is not needed anymore
    // as we pass the data down. We can just refetch here.
     const fetchAgain = async () => {
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
        setSubmissions(data.filter(s => s.submissionType === 'conference'));
      } catch (error) {
        // ... error handling
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgain();
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conference Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new and re-submitted manuscripts for conferences.</p>
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
            <ConferenceSubmissionsTable 
              submissions={newSubmissions} 
              isLoading={isLoading} 
              onDataChange={handleDataChange}
            />
        </TabsContent>
        <TabsContent value="re-verification">
            <ConferenceSubmissionsTable 
              submissions={reSubmissions} 
              isLoading={isLoading}
              onDataChange={handleDataChange}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}
