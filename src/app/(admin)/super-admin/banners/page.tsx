
// src/app/(admin)/super-admin/banners/page.tsx
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
import type { Banner } from "@/services/bannerService";
import { getBanners } from "@/services/bannerService";
import AddBannerForm from "@/components/forms/add-banner-form";
import EditBannerForm from "@/components/forms/edit-banner-form";
import BannersTable from "@/components/tables/banners-table";

export default function ManageBannersPage() {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<Banner | null>(null);
  const { toast } = useToast();

  const fetchBanners = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBanners();
      console.log(data);
      setBanners(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error Fetching Banners",
        description: `Could not fetch banners: ${message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleBannerAdded = () => {
    setIsAddDialogOpen(false);
    toast({
      title: "Banner Added!",
      description: "The new banner has been successfully created.",
    });
    fetchBanners(); // Refresh the list
  };

  const handleBannerUpdated = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "Banner Updated!",
      description: "The banner has been successfully updated.",
    });
    fetchBanners();
  };
  
  const handleBannerDeleted = () => {
    toast({
        title: "Banner Deleted",
        description: "The banner has been successfully deleted.",
    });
    fetchBanners(); // Refresh the list
  }
  
  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hero Banner Management</h1>
          <p className="text-muted-foreground">
            Manage the banners displayed on the homepage hero section.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new homepage banner.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow min-h-0">
              <AddBannerForm onBannerAdded={handleBannerAdded} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BannersTable 
        banners={banners}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onBannerDeleted={handleBannerDeleted}
      />

       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle>Edit Banner</DialogTitle>
              <DialogDescription>
                Modify the details for this homepage banner.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow min-h-0">
                {selectedBanner && (
                    <EditBannerForm
                        banner={selectedBanner}
                        onBannerUpdated={handleBannerUpdated}
                    />
                )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}
