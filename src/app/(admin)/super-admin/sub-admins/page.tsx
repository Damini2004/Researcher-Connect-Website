// src/app/(admin)/super-admin/sub-admins/page.tsx
"use client";

import SubAdminTable from "@/components/tables/sub-admin-table";
import { getSubAdmins, SubAdmin } from "@/services/subAdminService";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function SubAdminDashboardPage() {
  const [subAdmins, setSubAdmins] = React.useState<SubAdmin[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchAdmins = React.useCallback(async () => {
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
  }, [toast]);

  React.useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleAdminUpdated = (updatedAdmin: SubAdmin) => {
    setSubAdmins(admins => admins.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sub-Admin Management</h1>
          <p className="text-muted-foreground">
            View and manage all sub-administrators in the system.
          </p>
        </div>
      </div>
       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads Up!</AlertTitle>
        <AlertDescription>
          Sub-admin user accounts must be created in the Firebase Authentication console. This table reflects the records in the Firestore database.
        </AlertDescription>
      </Alert>

      <SubAdminTable
        subAdmins={subAdmins}
        isLoading={isLoading}
        onAdminChange={fetchAdmins}
        onAdminUpdated={handleAdminUpdated}
      />
    </div>
  );
}
