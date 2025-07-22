
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PastConferencesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Past Conferences</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explore our archive of past conferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Past Conferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Information about past conferences will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
