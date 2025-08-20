// src/app/(admin)/super-admin/internships/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import AddInternshipForm from "@/components/forms/add-internship-form";
import InternshipsTable from "@/components/tables/internships-table";
import { getInternships, Internship } from "@/services/internshipService";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ManageInternshipsPage() {
  const [internships, setInternships] = React.useState<Internship[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const fetchInternships = React.useCallback(async () => {
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

  React.useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  const handleInternshipAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Internship Added!",
      description: "The new internship has been successfully created.",
    });
    fetchInternships();
  };

  const handleInternshipDeleted = () => {
    toast({
        title: "Internship Deleted",
        description: "The internship has been successfully deleted.",
    });
    fetchInternships();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Internship Management</h1>
          <p className="text-muted-foreground">
            Create, view, and manage all internship opportunities.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Add New Internship</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new internship listing.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow min-h-0">
              <ScrollArea className="h-full">
                <div className="px-6 py-4">
                  <AddInternshipForm onInternshipAdded={handleInternshipAdded} />
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <InternshipsTable 
        internships={internships}
        isLoading={isLoading}
        onInternshipDeleted={handleInternshipDeleted}
      />
    </div>
  );
}
