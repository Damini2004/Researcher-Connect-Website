
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";
import AddInternshipForm from "@/components/forms/add-internship-form";
import InternshipsTable from "@/components/tables/internships-table";
import { useState, useEffect, useCallback } from "react";
import { getInternships, Internship } from "@/services/internshipService";
import { useToast } from "@/hooks/use-toast";

export default function ManageInternshipsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchInternships = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getInternships();
      setInternships(data);
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

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);
  
  const handleInternshipAdded = () => {
    setIsAddDialogOpen(false);
    setIsSuccessAlertOpen(true);
    fetchInternships(); // Re-fetch the data
  };

  const handleInternshipDeleted = () => {
    toast({
      title: "Internship Deleted",
      description: "The internship has been removed from the list.",
    });
    fetchInternships(); // Re-fetch the data
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Internship Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove internship listings.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Internship</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new internship opportunity.
              </DialogDescription>
            </DialogHeader>
            <AddInternshipForm onInternshipAdded={handleInternshipAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <InternshipsTable 
        internships={internships}
        isLoading={isLoading}
        onInternshipDeleted={handleInternshipDeleted}
      />
      
      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Internship Added!</AlertDialogTitle>
            <AlertDialogDescription>
              The new internship has been successfully added to the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsSuccessAlertOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
