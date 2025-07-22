
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, UserCheck, Lightbulb } from "lucide-react";

const awardCategories = [
    {
        icon: Award,
        title: "Best Paper Award",
        description: "Presented to the author(s) of the most outstanding paper, selected for its originality, technical excellence, and clarity of presentation."
    },
    {
        icon: BookOpen,
        title: "Best Poster Award",
        description: "Awarded to the most innovative and well-presented research poster, recognizing the quality of the research and the effectiveness of the visual display."
    },
    {
        icon: UserCheck,
        title: "Young Researcher Award",
        description: "Recognizing an outstanding young scientist who has shown exceptional promise and has made a significant contribution to their field early in their career."
    },
    {
        icon: Lightbulb,
        title: "Innovation in Technology Award",
        description: "This award celebrates a groundbreaking technological innovation presented at the conference that has the potential for significant real-world impact."
    }
];

export default function AwardsPage() {
  return (
    <div className="bg-secondary/50 py-16 md:py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Awards & Recognition</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            IFERP is committed to celebrating excellence in research and innovation. Our awards honor the outstanding contributions of researchers and scholars who are pushing the boundaries of knowledge.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {awardCategories.map((award, index) => (
            <Card key={index} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-primary/10">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                  <award.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{award.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
