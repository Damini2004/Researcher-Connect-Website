
"use client";

import SubAdminTable from "@/components/tables/sub-admin-table";
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
import AddSubAdminForm from "@/components/forms/add-sub-admin-form";
import { useEffect, useState } from "react";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ManageSubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const data = await getSubAdmins();
      setSubAdmins(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch sub-admins.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdminAdded = () => {
    setIsAddDialogOpen(false);
    setIsSuccessAlertOpen(true);
    fetchAdmins();
  };

  const handleAdminUpdated = (updatedAdmin: SubAdmin) => {
    setSubAdmins(prevAdmins => 
        prevAdmins.map(admin => 
            admin.id === updatedAdmin.id ? updatedAdmin : admin
        )
    );
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Sub Admin Management
          </h1>
          <p className="text-muted-foreground">
            Approve, edit, or remove sub administrators.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Sub Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Sub Admin</DialogTitle>
              <DialogDescription>
                Fill out the form to add a new sub administrator. They will be
                set to 'Pending' status by default.
              </DialogDescription>
            </DialogHeader>
            <AddSubAdminForm onAdminAdded={handleAdminAdded} />
          </DialogContent>
        </Dialog>
      </div>
      <SubAdminTable
        subAdmins={subAdmins}
        isLoading={isLoading}
        onAdminChange={fetchAdmins}
        onAdminUpdated={handleAdminUpdated}
      />

      <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sub Admin Added</AlertDialogTitle>
            <AlertDialogDescription>
              The new sub admin has been successfully added to the list and is pending approval.
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
