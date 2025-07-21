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
            <section className="relative w-full h-[400px] bg-primary/10 flex items-center justify-center text-center px-4">
                <Image
                    src="https://images.unsplash.com/photo-1587825140708-df876c1b3df1?q=80&w=1600&h=400&auto=format&fit=crop"
                    alt="Conference Presentation"
                    data-ai-hint="conference presentation"
                    fill
                    className="object-cover opacity-10"
                />
                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Conference Proceedings
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Share your research on a global stage. All accepted abstracts from our conferences are published in our prestigious, indexed Conference Proceedings.
                    </p>
                    <Button size="lg" className="mt-8" asChild>
                        <a href="/conference">
                            View Upcoming Conferences <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </section>
            
            <section className="w-full py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary">Why Publish With Us?</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Amplify Your Research Impact</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our conference proceedings offer a unique platform to disseminate your findings, gain valuable feedback, and connect with a global network of researchers and industry leaders.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit) => (
                            <Card key={benefit.title} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-primary/10">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                      <benefit.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="mt-4">{benefit.title}</CardTitle>
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
