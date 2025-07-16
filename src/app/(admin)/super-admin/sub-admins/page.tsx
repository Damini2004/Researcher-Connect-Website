import SubAdminTable from "@/components/tables/sub-admin-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ManageSubAdminsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Sub Admin Management</h1>
            <p className="text-muted-foreground">Approve, edit, or remove sub administrators.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Sub Admin
        </Button>
      </div>
      <SubAdminTable />
    </div>
  );
}
