import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, Presentation, Globe } from "lucide-react";
import Image from "next/image";

const benefits = [
    {
        icon: Globe,
        title: "Global Dissemination",
        description: "Present your work to an international audience and have it published in our indexed conference proceedings."
    },
    {
        icon: Presentation,
        title: "Oral & Poster Presentations",
        description: "Accepted abstracts are considered for both oral presentations and poster sessions at our conferences."
    },
    {
        icon: FileCheck2,
        title: "Peer-Reviewed Content",
        description: "All submissions undergo a rigorous peer-review process by our expert editorial committees."
    }
];

export default function ConferenceProceedingsPage() {
    return (
        <div>
            <section className="w-full py-20 md:py-32 bg-primary/5">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Conference Proceedings
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Share your research on a global stage. All accepted abstracts from IFERP conferences are published in our prestigious Conference Proceedings, an online supplement to our journals.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button asChild size="lg">
                                    <a href="/conference">
                                        View Upcoming Conferences <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <Image
                            src="https://images.unsplash.com/photo-1587825140708-df876c1b3df1?q=80&w=600&h=400&auto=format&fit=crop"
                            width="600"
                            height="400"
                            alt="Conference Presentation"
                            data-ai-hint="conference presentation"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                        />
                    </div>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Benefits</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Publish in Our Proceedings?</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our conference proceedings offer a unique platform to disseminate your findings and connect with the global research community.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                        {benefits.map((benefit) => (
                            <Card key={benefit.title} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                      <benefit.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="mt-2">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
