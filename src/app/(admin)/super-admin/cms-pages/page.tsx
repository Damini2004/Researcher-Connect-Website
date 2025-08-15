// src/app/(admin)/super-admin/cms-pages/page.tsx
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getPages, updatePageContent, type CmsPage } from "@/services/cmsService";
import CmsPagesTable from "@/components/tables/cms-pages-table";
import EditCmsPageForm from "@/components/forms/edit-cms-page-form";

export default function ManageCmsPagesPage() {
  const [pages, setPages] = React.useState<CmsPage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState<CmsPage | null>(null);
  const { toast } = useToast();

  const fetchPages = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPages();
      setPages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch CMS pages.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleEditClick = (page: CmsPage) => {
    setSelectedPage(page);
    setIsEditDialogOpen(true);
  };

  const handlePageUpdated = () => {
    setIsEditDialogOpen(false);
    setSelectedPage(null);
    toast({
      title: "Page Updated!",
      description: "The page content has been successfully saved.",
    });
    fetchPages();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CMS Page Management</h1>
        <p className="text-muted-foreground">
          Edit the content of the public-facing static pages.
        </p>
      </div>
      <CmsPagesTable
        pages={pages}
        isLoading={isLoading}
        onEdit={handleEditClick}
      />
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Page: {selectedPage?.title}</DialogTitle>
            <DialogDescription>
              Modify the content below. Changes will be live immediately.
            </DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <div className="flex-grow overflow-y-auto pr-4 -mr-2">
              <EditCmsPageForm
                page={selectedPage}
                onPageUpdated={handlePageUpdated}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
