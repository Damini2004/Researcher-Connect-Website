import InquiriesTable from "@/components/tables/inquiries-table";

export default function InquiriesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Contact Form Inquiries</h1>
                <p className="text-muted-foreground">Review and respond to inquiries from users.</p>
            </div>
            <InquiriesTable />
        </div>
    );
}
