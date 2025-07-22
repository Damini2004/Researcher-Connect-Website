
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutConferencePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About IFERP Conferences</h1>
        <p className="mt-4 text-lg text-muted-foreground">Learn more about our mission and what makes our conferences unique.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>About IFERP Conferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Details about IFERP conferences will be provided here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
