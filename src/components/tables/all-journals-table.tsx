
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { getJournals, Journal, updateJournalStatus, deleteJournal } from "@/services/journalService";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import EditJournalForm from "../forms/edit-journal-form";

export default function AllJournalsTable() {
  const { toast } = useToast();
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedJournal, setSelectedJournal] = React.useState<Journal | null>(null);

  React.useEffect(() => {
    async function fetchJournals() {
      setIsLoading(true);
      try {
        const fetchedJournals = await getJournals();
        setJournals(fetchedJournals);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch journals.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchJournals();
  }, [toast]);

  const handleStatusChange = async (journalId: string, status: Journal['status']) => {
    const originalJournals = [...journals];
    
    setJournals(journals.map(j => j.id === journalId ? { ...j, status } : j));

    const result = await updateJournalStatus(journalId, status);
    if (!result.success) {
      setJournals(originalJournals);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    } else {
        toast({
            title: "Success",
            description: "Journal status updated.",
        });
    }
  };

  const handleEditClick = (journal: Journal) => {
    setSelectedJournal(journal);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (journal: Journal) => {
    setSelectedJournal(journal);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedJournal) return;

    const result = await deleteJournal(selectedJournal.id);
    if (result.success) {
      toast({
        title: "Journal Deleted",
        description: `"${selectedJournal.journalName}" has been successfully deleted.`,
      });
      setJournals(journals.filter(j => j.id !== selectedJournal.id));
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedJournal(null);
  }

  const handleJournalUpdated = (updatedJournal: Journal) => {
    setJournals(journals.map(j => j.id === updatedJournal.id ? updatedJournal : j));
  };

  const filteredJournals = journals.filter(
    (journal) =>
      journal.journalName.toLowerCase().includes(filter.toLowerCase()) ||
      journal.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Journals</CardTitle>
          <CardDescription>View, manage, edit, and delete journals in the system.</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by name or description..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Journal Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    Loading journals...
                  </TableCell>
                </TableRow>
              ) : filteredJournals.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                          No journals found.
                      </TableCell>
                  </TableRow>
              ) : (
                filteredJournals.map((journal) => (
                  <TableRow key={journal.id}>
                    <TableCell>
                      <Image
                        src={journal.imageSrc || "https://placehold.co/64x64.png"}
                        alt={journal.journalName}
                        width={64}
                        height={64}
                        data-ai-hint="journal cover"
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{journal.journalName}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm">
                      <p className="truncate">{journal.description}</p>
                    </TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={journal.status}
                        onValueChange={(value: Journal['status']) => handleStatusChange(journal.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => handleEditClick(journal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onSelect={() => handleDeleteClick(journal)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Journal</DialogTitle>
            <DialogDescription>
              Make changes to the journal details below.
            </DialogDescription>
          </DialogHeader>
          {selectedJournal && (
            <EditJournalForm
              journal={selectedJournal}
              onJournalUpdated={handleJournalUpdated}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              journal "{selectedJournal?.journalName}" and all associated data.
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
