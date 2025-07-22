
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, BarChart, Mic, Dna, ArrowRight } from "lucide-react";
import Image from "next/image";

const workshops = [
    {
        icon: PenTool,
        title: "Scientific Writing & Publication",
        description: "Master the art of scientific writing, from structuring your manuscript to navigating the peer-review process with confidence."
    },
    {
        icon: BarChart,
        title: "Data Analysis with R",
        description: "An intensive, hands-on workshop designed to equip researchers with the fundamental skills for data analysis and visualization using R."
    },
    {
        icon: Mic,
        title: "Effective Research Presentation",
        description: "Learn how to deliver compelling presentations that effectively communicate your research findings to a diverse audience."
    },
    {
        icon: Dna,
        title: "Advanced Topics in Genomics",
        description: "A deep dive into the latest techniques and technologies in genomics, suitable for researchers with a foundational knowledge of the field."
    }
];

export default function WorkshopsPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&h=800&auto=format&fit=crop"
                    alt="Workshop"
                    data-ai-hint="workshop collaboration"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          <div className="space-y-6">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1 font-semibold text-sm">
                Skill Development
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Workshops & Short Courses</h1>
            <p className="text-lg text-muted-foreground">
                Stay at the forefront of your field with our expert-led workshops and short courses. Designed for researchers, academics, and industry professionals, our programs provide practical skills and in-depth knowledge to accelerate your career.
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Featured Workshops</h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                    Explore our range of workshops designed to provide hands-on training and valuable insights.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {workshops.map((item, index) => (
                    <Card key={index} className="bg-background/80 backdrop-blur-sm border-primary/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                        <CardHeader className="items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-3">
                                <item.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-center text-muted-foreground">{item.description}</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button variant="outline" className="w-full">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
