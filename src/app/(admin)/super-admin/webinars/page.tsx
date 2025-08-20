// src/app/(admin)/super-admin/webinars/page.tsx
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
import AddWebinarForm from "@/components/forms/add-webinar-form";
import WebinarsTable from "@/components/tables/webinars-table";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ManageWebinarsPage() {
  const [webinars, setWebinars] = React.useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const fetchWebinars = React.useCallback(async () => {
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

  React.useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const handleWebinarAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Webinar Added!",
      description: "The new webinar has been successfully created.",
    });
    fetchWebinars();
  };

  const handleWebinarDeleted = () => {
    toast({
        title: "Webinar Deleted",
        description: "The webinar has been successfully deleted.",
    });
    fetchWebinars();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Webinar Management</h1>
          <p className="text-muted-foreground">
            Create, view, and manage all webinars.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Webinar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[120vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Add New Webinar</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new webinar listing.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow min-h-0">
              <ScrollArea className="h-full">
                <div className="px-6 py-4">
                  <AddWebinarForm onWebinarAdded={handleWebinarAdded} />
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <WebinarsTable 
        webinars={webinars}
        isLoading={isLoading}
        onWebinarDeleted={handleWebinarDeleted}
      />
    </div>
  );
}
