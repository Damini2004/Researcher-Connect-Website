import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Target, Users, BookOpen, Scaling, ArrowRight } from "lucide-react";

const selectionCriteria = [
    {
        icon: Target,
        title: "Journal Scope & Aims",
        description: "Ensure your manuscript aligns with the journal's focus areas and the type of articles it publishes."
    },
    {
        icon: Users,
        title: "Target Audience",
        description: "Consider who reads the journal. Will your work reach the right community of researchers and practitioners?"
    },
    {
        icon: Scaling,
        title: "Impact Factor & Metrics",
        description: "Evaluate journal metrics like Impact Factor, Citescore, and SJR to gauge its influence in the field."
    },
    {
        icon: BookOpen,
        title: "Indexing & Visibility",
        description: "Check if the journal is indexed in major databases like Scopus, Web of Science, and PubMed for maximum reach."
    }
]

export default function JournalSelectionPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1 font-semibold text-sm">
                Expert Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Choosing the Right Journal</h1>
            <p className="text-lg text-muted-foreground">
                Selecting the most suitable journal is a critical step in the publication process. A well-matched journal increases your chances of acceptance and ensures your research reaches the most relevant audience.
            </p>
            <Button size="lg" asChild>
                <a href="/contact-us">
                    Get Expert Assistance <ArrowRight className="ml-2 h-5 w-5" />
                </a>
            </Button>
          </div>
           <div className="relative aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
             <Image 
                src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=600&h=800&auto=format&fit=crop"
                alt="Researcher making a choice"
                data-ai-hint="decision choice"
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </div>

        <div className="mt-20 md:mt-28">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Key Selection Criteria</h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                    Evaluate these key factors to make an informed decision and find the best home for your manuscript.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {selectionCriteria.map((item, index) => (
                    <Card key={index} className="bg-background/80 backdrop-blur-sm border-primary/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-3">
                                <item.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
