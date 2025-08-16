import AllSubmissionsTable from "@/components/tables/all-submissions-table";

export default function AllSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Submissions</h1>
        <p className="text-muted-foreground">
          A complete list of all submissions in the system.
        </p>
      </div>
      <AllSubmissionsTable />
    </div>
  );
}
