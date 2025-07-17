
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye, MailWarning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSubmissions, deleteSubmission, type Submission } from '@/services/submissionService';
import EditSubmissionForm from '../forms/edit-submission-form';

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function JournalSubmissionsTable() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);

  const fetchSubmissions = React.useCallback(async () => {
      setIsLoading(true);
      try {
          const data = await getSubmissions();
          setSubmissions(data);
      } catch (error) {
          toast({
              title: "Error fetching submissions",
              description: "Could not retrieve the list of submissions.",
              variant: "destructive"
          });
      } finally {
          setIsLoading(false);
      }
  }, [toast]);

  React.useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleEditClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSubmission) return;
    const result = await deleteSubmission(selectedSubmission.id);
    if (result.success) {
      toast({
        title: "Submission Deleted",
        description: `"${selectedSubmission.title}" has been successfully deleted.`,
      });
      fetchSubmissions();
    } else {
       toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsDeleteDialogOpen(false);
    setSelectedSubmission(null);
  }

  const handleSubmissionUpdated = (updatedSubmission: Submission) => {
     // If the status is 'Done', it will be filtered out on the next fetch
    fetchSubmissions();
  };

  const handleAlert = (authorEmail: string, title: string) => {
    toast({
      title: "Alert Sent",
      description: `An email has been sent to ${authorEmail} regarding "${title}".`,
    });
  };

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

  const activeSubmissions = submissions.filter(s => s.status !== 'Done');

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Submissions for Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
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
                      <TableCell colSpan={6} className="text-center">Loading submissions...</TableCell>
                  </TableRow>
              ) : activeSubmissions.length === 0 ? (
                   <TableRow>
                      <TableCell colSpan={6} className="text-center">No active submissions found.</TableCell>
                  </TableRow>
              ) : (
                  activeSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-mono text-xs">{submission.id.substring(0, 6)}...</TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{submission.title}</TableCell>
                      <TableCell>{submission.fullName}</TableCell>
                      <TableCell>
                         <Badge className={cn("whitespace-nowrap", statusColors[submission.status])}>
                            {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleAlert(submission.email, submission.title)}>
                            <MailWarning className="h-4 w-4 mr-2" />
                            Alert
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => handleViewPdf(submission.manuscriptData)}>
                                <Eye className="mr-2 h-4 w-4" /> View PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleEditClick(submission)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onSelect={() => handleDeleteClick(submission)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Submission</DialogTitle>
            <DialogDescription>
              Update the submission details below.
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <EditSubmissionForm
              submission={selectedSubmission}
              onSubmissionUpdated={handleSubmissionUpdated}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              submission "{selectedSubmission?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
