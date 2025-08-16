
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
import AddWebinarForm from "@/components/forms/add-webinar-form";
import WebinarsTable from "@/components/tables/webinars-table";
import { useState, useEffect, useCallback } from "react";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";

export default function ManageWebinarsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchWebinars = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getWebinars();
      setWebinars(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch webinars.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);
  
  const handleWebinarAdded = () => {
    setIsAddDialogOpen(false);
    setIsSuccessAlertOpen(true);
    fetchWebinars(); // Re-fetch the data
  };

  const handleWebinarDeleted = () => {
    toast({
      title: "Webinar Deleted",
      description: "The webinar has been removed from the list.",
    });
    fetchWebinars(); // Re-fetch the data
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Webinar Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove webinar listings.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Webinar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Add New Webinar</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new webinar.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-4 -mr-2">
                <AddWebinarForm onWebinarAdded={handleWebinarAdded} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <WebinarsTable 
        webinars={webinars}
        isLoading={isLoading}
        onWebinarDeleted={handleWebinarDeleted}
      />
      
      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Webinar Added!</AlertDialogTitle>
            <AlertDialogDescription>
              The new webinar has been successfully added to the list.
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
