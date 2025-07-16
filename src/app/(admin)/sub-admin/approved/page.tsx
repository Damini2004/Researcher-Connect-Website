import ApprovedPapersTable from "@/components/tables/approved-papers-table";

export default function ApprovedPapersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Approved Papers</h1>
                <p className="text-muted-foreground">A list of all submissions that have been marked as 'Done'.</p>
            </div>
            <ApprovedPapersTable />
        </div>
    );
}
