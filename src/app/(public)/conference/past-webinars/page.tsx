
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PastWebinarsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Past Webinars</h1>
        <p className="mt-4 text-lg text-muted-foreground">Catch up on webinars you may have missed.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Past Webinars</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A list of past webinars will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
