
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlanConferencePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plan a Scientific Conference</h1>
        <p className="mt-4 text-lg text-muted-foreground">Collaborate with us to organize your next scientific event.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Plan a Scientific Conference</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Information on how to plan a conference with IFERP will be detailed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
