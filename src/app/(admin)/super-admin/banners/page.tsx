
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
import BannersTable from "@/components/tables/banners-table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ManageBannersPage() {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const fetchBanners = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch banners.",
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
    fetchBanners();
  };
  
  const handleBannerDeleted = () => {
    toast({
        title: "Banner Deleted",
        description: "The banner has been successfully deleted.",
    });
    fetchBanners();
  }

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
          <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new homepage banner.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <AddBannerForm onBannerAdded={handleBannerAdded} />
                    </div>
                </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <BannersTable 
        banners={banners}
        isLoading={isLoading}
        onBannerDeleted={handleBannerDeleted}
      />
    </div>
  );
}
