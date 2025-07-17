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
import { PlusCircle } from "lucide-react";
import AddSubAdminForm from "@/components/forms/add-sub-admin-form";

export default function ManageSubAdminsPage() {
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
        <Dialog>
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
            <AddSubAdminForm />
          </DialogContent>
        </Dialog>
      </div>
      <SubAdminTable />
    </div>
  );
}
