
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingConferencesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Conferences</h1>
        <p className="mt-4 text-lg text-muted-foreground">Join us at our next event.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Conferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Details about upcoming conferences will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
