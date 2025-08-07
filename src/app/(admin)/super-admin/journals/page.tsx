
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
import AddJournalForm from "@/components/forms/add-journal-form";
import AllJournalsTable from "@/components/tables/all-journals-table";
import { useState } from "react";

export default function ViewJournalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const handleJournalAdded = () => {
    setIsAddDialogOpen(false);
    setIsSuccessAlertOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Journal List</h1>
            <p className="text-muted-foreground">A complete list of all journals in the system.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Journal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Journal</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new journal to the system.
              </DialogDescription>
            </DialogHeader>
            <AddJournalForm onJournalAdded={handleJournalAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <AllJournalsTable />
      
      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Journal Added!</AlertDialogTitle>
            <AlertDialogDescription>
              The new journal has been successfully added to the list.
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
