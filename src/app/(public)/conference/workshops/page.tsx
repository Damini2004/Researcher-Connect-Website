
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkshopsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Workshops & Courses</h1>
        <p className="mt-4 text-lg text-muted-foreground">Enhance your skills with our expert-led workshops and courses.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workshops & Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Information about workshops and courses will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
