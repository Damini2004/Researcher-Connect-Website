
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
import AddConferenceForm from "@/components/forms/add-conference-form";
import ConferencesTable from "@/components/tables/conferences-table";
import { useState, useEffect, useCallback } from "react";
import { getConferences, Conference } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";
import EditConferenceForm from "@/components/forms/edit-conference-form";

export default function ManageConferencesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
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
    setIsSuccessAlertOpen(true);
    fetchConferences(); // Re-fetch the data
  };

  const handleConferenceUpdated = () => {
    setIsEditDialogOpen(false);
    setSelectedConference(null);
    toast({
      title: "Conference Updated!",
      description: "The conference details have been saved.",
    });
    fetchConferences();
  };

  const handleConferenceDeleted = () => {
    toast({
      title: "Conference Deleted",
      description: "The conference has been removed from the list.",
    });
    fetchConferences(); // Re-fetch the data
  }

  const handleEditClick = (conference: Conference) => {
    setSelectedConference(conference);
    setIsEditDialogOpen(true);
  };


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
          <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Add New Conference</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new conference.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto">
              <AddConferenceForm onConferenceAdded={handleConferenceAdded} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ConferencesTable 
        conferences={conferences}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onConferenceDeleted={handleConferenceDeleted}
      />
      
       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Conference</DialogTitle>
            <DialogDescription>
              Update the details for the conference below.
            </DialogDescription>
          </DialogHeader>
          {selectedConference && (
            <div className="flex-grow overflow-y-auto">
              <EditConferenceForm
                conference={selectedConference}
                onConferenceUpdated={handleConferenceUpdated}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conference Added!</AlertDialogTitle>
            <AlertDialogDescription>
              The new conference has been successfully added to the list.
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
