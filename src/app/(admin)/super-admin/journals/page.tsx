import AllJournalsTable from "@/components/tables/all-journals-table";

export default function ViewJournalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Journal Submissions</h1>
        <p className="text-muted-foreground">A complete list of all journal submissions in the system.</p>
      </div>
      <AllJournalsTable />
    </div>
  );
}
