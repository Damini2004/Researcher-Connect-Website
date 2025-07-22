
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingWebinarsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Webinars</h1>
        <p className="mt-4 text-lg text-muted-foreground">Join our upcoming sessions.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Webinars</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Details about upcoming webinars will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
