
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
import { PlusCircle } from "lucide-react";
import AddConferenceForm from "@/components/forms/add-conference-form";
import ConferencesTable from "@/components/tables/conferences-table";
import { useState, useEffect, useCallback } from "react";
import { getConferences, Conference } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";

export default function ManageConferencesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getConferences();
      setConferences(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch conferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);
  
  const handleConferenceAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Conference Added!",
      description: "The list has been updated with the new conference.",
    });
    fetchConferences(); // Re-fetch the data
  };

  const handleConferenceDeleted = () => {
    toast({
      title: "Conference Deleted",
      description: "The conference has been removed from the list.",
    });
    fetchConferences(); // Re-fetch the data
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Conference Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove conference listings.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Conference
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Conference</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new conference.
              </DialogDescription>
            </DialogHeader>
            <AddConferenceForm onConferenceAdded={handleConferenceAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <ConferencesTable 
        conferences={conferences}
        isLoading={isLoading}
        onConferenceDeleted={handleConferenceDeleted}
      />
      
    </div>
  );
}
