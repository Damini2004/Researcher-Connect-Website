// src/components/homepage/key-services-section.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bell, Headphones, Lightbulb, Users, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        icon: BarChart,
        title: "Business Consulting",
        description: "Solution for every business related problems, readily and skillfully."
    },
    {
        icon: Bell,
        title: "Risk Management",
        description: "Calculate every possible risk in your business, take control over them."
    },
    {
        icon: Lightbulb,
        title: "Market Research",
        description: "Know the market before taking any step, reduce risks before you go."
    },
    {
        icon: Headphones,
        title: "Quality Services",
        description: "Experience unparalleled service, from beginning to final construction."
    }
];

const subServices = [
    {
        icon: Users,
        title: "Awesome Team",
        description: "Before talking destination, we shine a spotlight across your organization to fully understand it."
    },
    {
        icon: Shield,
        title: "Excellent Support",
        description: "If you face any trouble, you can always let our dedicated support team help you. They are ready for you 24/7."
    },
    {
        icon: Zap,
        title: "Faster Performance",
        description: "We develop a systematic well-ordered process of analysis, from concept through implementation."
    }
]

export function KeyServicesSection() {
    return (
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Key Services</h2>
                        <div className="w-24 h-1 bg-primary mx-auto animate-width-pulse" />
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-2">
                            Get expert consultancy and support with our advisory firm that stands by your side always.
                        </p>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-12">
                    <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
                        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&h=675&auto=format&fit=crop" alt="Business Meeting" fill className="object-cover" data-ai-hint="business meeting" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                                <Button variant="outline" size="icon" className="h-20 w-20 rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </Button>
                            </Link>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-8">
                        {subServices.map((service) => (
                           <div key={service.title} className="flex flex-col text-left">
                                <div className="flex items-center gap-3">
                                    <service.icon className="h-6 w-6 text-primary flex-shrink-0" />
                                    <h4 className="text-lg font-bold">{service.title}</h4>
                                </div>
                                <p className="text-muted-foreground mt-2">
                                    {service.description}
                                </p>
                           </div>
                        ))}
                    </div>
                </div>

                <Card className="mt-20">
                  <CardContent className="p-10">
                    <div className="mx-auto grid items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
                        {services.map((service) => (
                            <div key={service.title} className="flex flex-col items-center text-center space-y-3">
                                <div className="p-4 rounded-full border-2 border-gray-200 w-fit">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
            </div>
        </section>
    );
}
