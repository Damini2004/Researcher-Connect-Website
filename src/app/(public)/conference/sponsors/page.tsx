
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SponsorsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsors & Exhibitors</h1>
        <p className="mt-4 text-lg text-muted-foreground">Partner with us and showcase your brand to a global audience.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sponsors & Exhibitors</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Information for potential sponsors and exhibitors will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
