
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
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Re-Verification Pending": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export default function AllSubmissionsTable() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const submissionsData = await getSubmissions();
        setSubmissions(submissionsData);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Could not retrieve submissions.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  const handleViewFile = (base64Data: string, fileName: string) => {
    if (!base64Data || !base64Data.startsWith('data:')) {
        toast({ title: "Error", description: "Invalid or missing file data.", variant: "destructive" });
        return;
    }
    
    const mimeType = base64Data.substring(base64Data.indexOf(':') + 1, base64Data.indexOf(';'));
    const fileExtension = mimeType.split('/')[1];

    // Sanitize filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if (mimeType === 'application/pdf') {
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: mimeType });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    } else {
        // For DOCX and other files, trigger download
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = `${safeFileName}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
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
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">Loading submissions...</TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">No submissions found.</TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium max-w-xs truncate">{submission.title}</TableCell>
                  <TableCell>{submission.fullName}</TableCell>
                  <TableCell>
                    <Badge className={cn("whitespace-nowrap", statusColors[submission.status])}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewFile(submission.manuscriptData, submission.title)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View File
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
