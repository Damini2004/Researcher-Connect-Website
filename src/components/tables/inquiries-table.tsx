
"use client";

import * as React from "react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { MoreHorizontal, Archive, MailOpen, Trash2, Briefcase, Eye, Download, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getInquiries, updateInquiryStatus, deleteInquiry, type Inquiry } from "@/services/inquiryService";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const statusOptions = ["New", "Read", "Archived"];
const typeOptions = ["General Inquiry", "Internship Application", "Webinar Registration"];


export default function InquiriesTable() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");

  const fetchInquiries = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedInquiries = await getInquiries();
      setInquiries(fetchedInquiries);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch inquiries.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);
  
  const handleStatusUpdate = async (inquiry: Inquiry, status: 'Read' | 'Archived') => {
    const result = await updateInquiryStatus(inquiry.id, status);
    if (result.success) {
        toast({ title: "Status Updated", description: `Inquiry from ${inquiry.name} marked as ${status}.`});
        fetchInquiries();
    } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
    }
  };

  const handleDeleteClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedInquiry) return;
    const result = await deleteInquiry(selectedInquiry.id);
     if (result.success) {
        toast({ title: "Inquiry Deleted", description: `Inquiry from ${selectedInquiry.name} has been deleted.`});
        fetchInquiries();
    } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsDeleteOpen(false);
    setSelectedInquiry(null);
  }

  const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsViewOpen(true);
    if (inquiry.status === 'New') {
        handleStatusUpdate(inquiry, 'Read');
    }
  };

  const handleDownloadResume = (resumeData: string, applicantName: string) => {
    if (!resumeData) {
        toast({ title: "Error", description: "No resume data available to download.", variant: "destructive" });
        return;
    }
    const link = document.createElement('a');
    link.href = resumeData;
    const fileExtension = resumeData.split(';')[0].split('/')[1].split('+')[0]; // pdf, doc, docx etc.
    link.download = `Resume-${applicantName.replace(/\s/g, '_')}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const filteredInquiries = inquiries.filter(inquiry => {
    const searchMatch = searchFilter === "" ||
        inquiry.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (inquiry.subject && inquiry.subject.toLowerCase().includes(searchFilter.toLowerCase()));
    
    const statusMatch = statusFilter === 'all' || inquiry.status === statusFilter;
    const typeMatch = typeFilter === 'all' || inquiry.type === typeFilter;
    
    return searchMatch && statusMatch && typeMatch;
  });


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Review and manage user inquiries from the contact form.</CardDescription>
          <div className="flex flex-col md:flex-row gap-4 justify-between pt-4">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Search by name, email, or subject..."
                className="pl-8"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                />
            </div>
            <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statusOptions.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {typeOptions.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject / Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Loading inquiries...
                  </TableCell>
                </TableRow>
              ) : filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} data-state={inquiry.status === 'New' ? 'selected' : ''} className="data-[state=selected]:bg-muted/50">
                    <TableCell>
                        <div className="font-medium">{inquiry.name}</div>
                        <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">
                      {inquiry.type === 'Internship Application' || inquiry.type === 'Webinar Registration' ? (
                          <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{inquiry.subject}</span>
                          </div>
                      ) : (
                          <span>{inquiry.subject}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={inquiry.status === 'New' ? 'default' : 'secondary'}>{inquiry.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => handleViewDetails(inquiry)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          {inquiry.status !== 'Read' && (
                             <DropdownMenuItem onSelect={() => handleStatusUpdate(inquiry, 'Read')}>
                                <MailOpen className="mr-2 h-4 w-4" /> Mark as Read
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onSelect={() => handleStatusUpdate(inquiry, 'Archived')}>
                            <Archive className="mr-2 h-4 w-4" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onSelect={() => handleDeleteClick(inquiry)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedInquiry?.name} ({selectedInquiry?.email}) on {selectedInquiry && new Date(selectedInquiry.date).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
            {selectedInquiry && (
                 <div className="flex-grow overflow-y-auto pr-4">
                    {selectedInquiry.type === 'Internship Application' && (
                        <div className="space-y-4 mb-4">
                            <h4 className="font-semibold">Application Details</h4>
                            <div className="text-sm space-y-2">
                                <p><strong>Phone:</strong> {selectedInquiry.phone}</p>
                                <p><strong>City:</strong> {selectedInquiry.city}</p>
                                <p><strong>University:</strong> {selectedInquiry.university}</p>
                                <p><strong>Degree:</strong> {selectedInquiry.degree}</p>
                            </div>
                            {selectedInquiry.resumeData && (
                                <Button onClick={() => handleDownloadResume(selectedInquiry!.resumeData!, selectedInquiry!.name)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Resume
                                </Button>
                            )}
                            <Separator />
                        </div>
                    )}
                    <h4 className="font-semibold mb-2">Message</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
                 </div>
            )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the inquiry from "{selectedInquiry?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
