import JournalSubmissionsTable from "@/components/tables/journal-submissions-table";

export default function SubAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paper Submissions</h1>
        <p className="text-muted-foreground">Verify and manage new manuscript submissions.</p>
      </div>
      <JournalSubmissionsTable />
    </div>
  );
}
