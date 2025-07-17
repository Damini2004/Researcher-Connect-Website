
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
import AddInternshipForm from "@/components/forms/add-internship-form";
import InternshipsTable from "@/components/tables/internships-table";
import { useState } from "react";

export default function ManageInternshipsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
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
            <AddInternshipForm onInternshipAdded={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <InternshipsTable />
      
    </div>
  );
}
