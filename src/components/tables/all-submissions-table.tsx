
"use client";

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSubmissions, type Submission } from '@/services/submissionService';
import { getSubAdmins, type SubAdmin } from '@/services/subAdminService';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function AllSubmissionsTable() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [submissionsData, subAdminsData] = await Promise.all([
          getSubmissions(),
          getSubAdmins(),
        ]);
        setSubmissions(submissionsData);
        setSubAdmins(subAdminsData);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Could not retrieve submissions and admins.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);
  
  const getAdminNameById = (adminId?: string) => {
    if (!adminId) return <span className="text-muted-foreground">Unassigned</span>;
    const admin = subAdmins.find(a => a.id === adminId);
    return admin ? admin.name : <span className="text-muted-foreground">Unknown Admin</span>;
  }

  const handleViewPdf = (base64Data: string) => {
    if (!base64Data || !base64Data.startsWith('data:application/pdf;base64,')) {
        toast({ title: "Error", description: "Invalid or missing PDF data.", variant: "destructive" });
        return;
    }
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: 'application/pdf;base64' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Manuscript Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">Loading submissions...</TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">No submissions found.</TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium max-w-xs truncate">{submission.title}</TableCell>
                  <TableCell>{submission.fullName}</TableCell>
                  <TableCell>{getAdminNameById(submission.assignedSubAdminId)}</TableCell>
                  <TableCell>
                    <Badge className={cn("whitespace-nowrap", statusColors[submission.status])}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewPdf(submission.manuscriptData)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
