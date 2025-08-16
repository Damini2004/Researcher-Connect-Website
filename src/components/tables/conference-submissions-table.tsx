// src/components/tables/conference-submissions-table.tsx
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
import { MoreHorizontal, Edit, Trash2, Eye, MailWarning, History, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deleteSubmission, type Submission } from '@/services/submissionService';
import EditSubmissionForm from '../forms/edit-submission-form';
import { cn } from '@/lib/utils';
import AlertAuthorForm from '../forms/alert-author-form';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const statusColors: { [key: string]: string } = {
  Done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Verification Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Re-Verification Pending": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const statusOptions = ["In Progress", "Canceled", "Done"];

interface ConferenceSubmissionsTableProps {
    submissions: Submission[];
    isLoading: boolean;
    onDataChange: () => void;
}

export default function ConferenceSubmissionsTable({ submissions, isLoading, onDataChange }: ConferenceSubmissionsTableProps) {
  const { toast } = useToast();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = React.useState(false);
  
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);

  const [searchFilter, setSearchFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const handleEditClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDeleteDialogOpen(true);
  };
  
  const handleAlertClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsAlertDialogOpen(true);
  };
  
  const handleHistoryClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsHistoryDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSubmission) return;
    const result = await deleteSubmission(selectedSubmission.id);
    if (result.success) {
      toast({
        title: "Submission Deleted",
        description: `"${selectedSubmission.title}" has been successfully deleted.`,
      });
      onDataChange();
    } else {
       toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsDeleteDialogOpen(false);
    setSelectedSubmission(null);
  }

  const handleSubmissionUpdated = () => {
    onDataChange();
  };
  
  const handleAlertSent = () => {
    setIsAlertDialogOpen(false);
    setSelectedSubmission(null);
  };

  const handleViewFile = (base64Data: string, fileName: string) => {
    if (!base64Data || !base64Data.startsWith('data:')) {
        toast({ title: "Error", description: "Invalid or missing file data.", variant: "destructive" });
        return;
    }
    
    const mimeType = base64Data.substring(base64Data.indexOf(':') + 1, base64Data.indexOf(';'));
    
    let fileExtension = 'file';
    if (mimeType.includes('pdf')) fileExtension = 'pdf';
    else if (mimeType.includes('vnd.openxmlformats-officedocument.wordprocessingml.document')) fileExtension = 'docx';
    else if (mimeType.includes('msword')) fileExtension = 'doc';

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
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = `${safeFileName}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };
  
  const filteredSubmissions = submissions.filter(s => {
      const searchMatch = searchFilter === "" ||
          s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          s.fullName.toLowerCase().includes(searchFilter.toLowerCase());

      const statusMatch = statusFilter === 'all' || s.status === statusFilter;

      return searchMatch && statusMatch;
  });

  return (
    <>
      <Card>
         <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Search by title or author..."
                className="pl-8"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                />
            </div>
            <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statusOptions.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                ) : filteredSubmissions.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                            No submissions found.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredSubmissions.map((submission) => (
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
                            <Button variant="outline" size="sm" onClick={() => handleAlertClick(submission)}>
                              <MailWarning className="h-4 w-4 md:mr-2" />
                              <span className="hidden md:inline">Alert</span>
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
                                <DropdownMenuItem onSelect={() => handleViewFile(submission.manuscriptData, submission.title)}>
                                  <Eye className="mr-2 h-4 w-4" /> View File
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleEditClick(submission)}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={() => handleHistoryClick(submission)} 
                                  disabled={!submission.history || submission.history.length === 0}
                                >
                                  <History className="mr-2 h-4 w-4" /> View History
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
          </div>
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
      
      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Send Alert to Author</DialogTitle>
                <DialogDescription>
                    Compose a message to send to the author regarding their submission.
                </DialogDescription>
            </DialogHeader>
            {selectedSubmission && (
                <AlertAuthorForm 
                    submission={selectedSubmission}
                    onAlertSent={handleAlertSent}
                />
            )}
        </DialogContent>
      </Dialog>

      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle>Submission History for "{selectedSubmission?.title}"</DialogTitle>
                <DialogDescription>
                    Showing a log of previous versions for this manuscript.
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow pr-4 -mr-2">
                <div className="space-y-6">
                    {selectedSubmission?.history?.sort((a, b) => new Date(b.actionDate).getTime() - new Date(a.actionDate).getTime()).map((entry, index) => (
                        <div key={index}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Version {selectedSubmission.history!.length - index}</CardTitle>
                                    <CardDescription>
                                       Action: <span className="font-semibold">{entry.action}</span> on {new Date(entry.actionDate).toLocaleString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2">
                                    <p><strong>Original Title:</strong> {entry.title}</p>
                                    <p><strong>Original Status:</strong> {entry.status}</p>
                                    <p><strong>Originally Submitted:</strong> {new Date(entry.submittedAt).toLocaleString()}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </ScrollArea>
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
