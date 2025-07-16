import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ConferencePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">JournalEdge Annual Conference 2024</h1>
        <p className="mt-4 text-lg text-muted-foreground">Innovate, Collaborate, and Inspire: The Future of Interdisciplinary Research.</p>
      </div>

      <Card className="overflow-hidden">
        <Image 
          src="https://placehold.co/1200x400.png"
          width={1200}
          height={400}
          alt="Conference banner"
          data-ai-hint="conference academic"
          className="w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="text-2xl">Join us in San Francisco, CA | December 5-7, 2024</CardTitle>
          <CardDescription>
            Our annual conference brings together the brightest minds from across the globe. Present your work, network with peers, and learn from leading experts in your field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Keynote speakers, workshops, and poster sessions will cover a wide range of topics, with a special focus on the intersection of technology and traditional academic disciplines. All accepted papers will be published in a special conference proceeding.</p>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Register Now</Button>
          <Button variant="outline" className="ml-4">Call for Papers</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
