
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const corePrinciples = [
    "Fostering Collaboration: We create environments that encourage networking and interdisciplinary collaboration among academics, researchers, and industry professionals.",
    "Promoting Innovation: Our conferences are platforms for showcasing cutting-edge research and innovative ideas that have the potential to shape the future.",
    "Ensuring Quality: Through a rigorous peer-review process, we maintain the highest standards of academic integrity and quality for all presented work.",
    "Global Reach: We aim to bring together diverse perspectives from around the world to enrich discussions and broaden the impact of research."
];

export default function AboutConferencePage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About IFERP Conferences</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn more about our mission to advance knowledge and foster innovation by connecting the brightest minds from around the globe.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto shadow-lg">
          <div className="p-8">
            <CardHeader className="p-0">
                <CardTitle>Our Mission</CardTitle>
                <CardDescription className="pt-2">
                    At IFERP, our mission is to provide a premier platform for researchers, academics, and industry professionals to present and discuss the most recent innovations, trends, and concerns in various fields of engineering and technology.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
                <h3 className="font-semibold mb-4">Core Principles</h3>
                <ul className="space-y-4">
                    {corePrinciples.map((principle, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{principle}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </div>
      </Card>
    </div>
  );
}
