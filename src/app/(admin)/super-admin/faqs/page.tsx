// src/app/(admin)/super-admin/faqs/page.tsx
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
import { useToast } from "@/hooks/use-toast";
import type { Faq } from "@/services/faqService";
import { getFaqs } from "@/services/faqService";
import AddFaqForm from "@/components/forms/add-faq-form";
import EditFaqForm from "@/components/forms/edit-faq-form";
import FaqsTable from "@/components/tables/faqs-table";

export default function ManageFaqsPage() {
  const [faqs, setFaqs] = React.useState<Faq[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedFaq, setSelectedFaq] = React.useState<Faq | null>(null);
  const { toast } = useToast();

  const fetchFaqs = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFaqs();
      setFaqs(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch FAQs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleFaqAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "FAQ Added!",
      description: "The new FAQ has been successfully created.",
    });
    fetchFaqs();
  };
  
  const handleFaqUpdated = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "FAQ Updated!",
      description: "The FAQ has been successfully saved.",
    });
    fetchFaqs();
  };

  const handleFaqDeleted = () => {
    toast({
        title: "FAQ Deleted",
        description: "The FAQ has been successfully deleted.",
    });
    fetchFaqs();
  }

  const handleEditClick = (faq: Faq) => {
    setSelectedFaq(faq);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQ Management</h1>
          <p className="text-muted-foreground">
            Create, view, and manage all Frequently Asked Questions.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new FAQ.
              </DialogDescription>
            </DialogHeader>
            <AddFaqForm onFaqAdded={handleFaqAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <FaqsTable 
        faqs={faqs}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onFaqDeleted={handleFaqDeleted}
      />
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>
              Modify the FAQ details below.
            </DialogDescription>
          </DialogHeader>
            {selectedFaq && (
                <EditFaqForm
                  faq={selectedFaq}
                  onFaqUpdated={handleFaqUpdated}
                />
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}