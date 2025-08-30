
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Cpu, Map, GanttChartSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    { name: "Reliability Analysis", description: "Comprehensive RAMS analysis to ensure system safety and reliability.", icon: Cpu },
    { name: "GIS Mapping", description: "Advanced SDG mapping with our powerful SDGMapper tool.", icon: Map },
    { name: "Project Management", description: "Integrated tools for seamless project tracking and management.", icon: GanttChartSquare },
];

export default function SoftwareSolutionsPage() {
    return (
        <div>
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Data analytics dashboard"
                    data-ai-hint="data dashboard"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Software Solutions</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <Image
                            alt="Software Interface"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://cdn.intuji.com/2023/08/Custom-software-development.jpg"
                            data-ai-hint="software development"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">RAMS & SDGMapper</h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                   We provide state-of-the-art software solutions tailored for complex engineering and development projects. Our flagship products, RAMS for reliability engineering and SDGMapper for sustainable development goal tracking, empower organizations to achieve excellence and impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Core Software Features</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Powerful tools to drive your projects forward.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map(feature => (
                            <Card key={feature.name} className="text-center">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{feature.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <Button asChild size="lg">
                            <Link href="/contact-us">Request a Demo <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
