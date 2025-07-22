
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScientificGalleryPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Scientific Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explore posters and presentations from our past events.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Scientific Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content for the scientific gallery will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
