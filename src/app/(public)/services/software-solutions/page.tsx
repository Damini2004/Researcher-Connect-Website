
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Cpu, Map, GanttChartSquare } from "lucide-react";
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
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">Software Solutions</span>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">RAMS & SDGMapper</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We provide state-of-the-art software solutions tailored for complex engineering and development projects. Our flagship products, RAMS for reliability engineering and SDGMapper for sustainable development goal tracking, empower organizations to achieve excellence and impact.
                            </p>
                            <Button asChild size="lg" className="mt-6">
                                <Link href="/contact-us">Request a Demo</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {features.map(feature => (
                                <Card key={feature.name}>
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                        <CardTitle>{feature.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
