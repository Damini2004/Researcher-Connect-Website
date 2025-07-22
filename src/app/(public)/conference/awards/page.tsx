
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AwardsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Awards & Recognition</h1>
        <p className="mt-4 text-lg text-muted-foreground">Celebrating excellence in research and innovation.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Awards & Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Details about conference awards and recognitions will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
