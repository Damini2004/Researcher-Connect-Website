
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConferenceVideosPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Conference Videos & Galleries</h1>
        <p className="mt-4 text-lg text-muted-foreground">Watch sessions and view photos from our events.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Videos & Galleries</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conference videos and photo galleries will be featured here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
