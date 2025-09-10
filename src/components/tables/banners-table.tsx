
// src/components/tables/banners-table.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import type { Banner } from "@/services/bannerService";
import { deleteBanner } from "@/services/bannerService";

interface BannersTableProps {
  banners: Banner[];
  isLoading: boolean;
  onEdit: (banner: Banner) => void;
  onBannerDeleted: () => void;
}

export default function BannersTable({ banners, isLoading, onEdit, onBannerDeleted }: BannersTableProps) {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<Banner | null>(null);
  
  const handleDeleteClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedBanner) return;

    const result = await deleteBanner(selectedBanner.id);
    if (result.success) {
      onBannerDeleted();
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedBanner(null);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Banners</CardTitle>
          <CardDescription>Banners currently displayed on the homepage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    Loading banners...
                  </TableCell>
                </TableRow>
              ) : banners.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                          No banners found.
                      </TableCell>
                  </TableRow>
              ) : (
                banners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>{banner.order}</TableCell>
                    <TableCell>
                      <Image
                        src={banner.imageSrc}
                        alt={banner.titleLine1}
                        width={150}
                        height={50}
                        data-ai-hint="banner image"
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{banner.titleLine1} {banner.titleLine2}</TableCell>
                    <TableCell className="max-w-xs truncate">{banner.subtitle}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem onSelect={() => onEdit(banner)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onSelect={() => handleDeleteClick(banner)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this banner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
