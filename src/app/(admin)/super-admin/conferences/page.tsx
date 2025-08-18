// src/app/(admin)/super-admin/conferences/page.tsx
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
import AddConferenceForm from "@/components/forms/add-conference-form";
import EditConferenceForm from "@/components/forms/edit-conference-form";
import ConferencesTable from "@/components/tables/conferences-table";
import { getConferences } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";
import type { Conference } from "@/lib/types";

export default function ManageConferencesPage() {
  const [conferences, setConferences] = React.useState<Conference[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedConference, setSelectedConference] = React.useState<Conference | null>(null);
  const { toast } = useToast();

  const fetchConferences = React.useCallback(async () => {
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

  React.useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const handleConferenceAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Conference Added!",
      description: "The new conference has been successfully created.",
    });
    fetchConferences();
  };
  
  const handleConferenceUpdated = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "Conference Updated!",
      description: "The conference details have been successfully saved.",
    });
    fetchConferences();
  };

  const handleConferenceDeleted = () => {
    toast({
        title: "Conference Deleted",
        description: "The conference has been successfully deleted.",
    });
    fetchConferences();
  }

  const handleEditClick = (conference: Conference) => {
    setSelectedConference(conference);
    setIsEditDialogOpen(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conference Management</h1>
          <p className="text-muted-foreground">
            Create, view, and manage all conferences.
          </p>
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
                Fill out the form below to create a new conference listing.
              </DialogDescription>
            </DialogHeader>
            <AddConferenceForm onConferenceAdded={handleConferenceAdded} />
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
            <DialogTitle>Edit Conference: {selectedConference?.shortTitle}</DialogTitle>
            <DialogDescription>
              Modify the conference details below.
            </DialogDescription>
          </DialogHeader>
          {selectedConference && (
              <EditConferenceForm
                conference={selectedConference}
                onConferenceUpdated={handleConferenceUpdated}
              />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
