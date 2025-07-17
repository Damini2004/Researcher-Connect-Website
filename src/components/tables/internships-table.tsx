
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Trash2 } from "lucide-react";
import { getInternships, deleteInternship, Internship } from "@/services/internshipService";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";

export default function InternshipsTable() {
  const { toast } = useToast();
  const [internships, setInternships] = React.useState<Internship[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedInternship, setSelectedInternship] = React.useState<Internship | null>(null);

  const fetchInternships = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedInternships = await getInternships();
      setInternships(fetchedInternships);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch internships.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);
  
  const handleDeleteClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedInternship) return;

    const result = await deleteInternship(selectedInternship.id);
    if (result.success) {
      toast({
        title: "Internship Deleted",
        description: `"${selectedInternship.name}" has been successfully deleted.`,
      });
      setInternships(internships.filter(j => j.id !== selectedInternship.id));
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedInternship(null);
  }

  const filteredInternships = internships.filter(
    (internship) =>
      internship.name.toLowerCase().includes(filter.toLowerCase()) ||
      internship.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Internships</CardTitle>
          <CardDescription>View, manage, and delete internship listings.</CardDescription>
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
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    Loading internships...
                  </TableCell>
                </TableRow>
              ) : filteredInternships.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                          No internships found.
                      </TableCell>
                  </TableRow>
              ) : (
                filteredInternships.map((internship) => (
                  <TableRow key={internship.id}>
                    <TableCell>
                      <Image
                        src={internship.imageSrc || "https://placehold.co/64x64.png"}
                        alt={internship.name}
                        width={64}
                        height={64}
                        data-ai-hint="internship"
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{internship.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm">
                      <p className="truncate">{internship.description}</p>
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
                          <DropdownMenuItem 
                            className="text-destructive"
                            onSelect={() => handleDeleteClick(internship)}
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
      
      {/* Delete Confirmation Dialog */}
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              internship "{selectedInternship?.name}".
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
