
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronRight, FileText, Microscope, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const supportAreas = [
    { title: "Proposal Writing", description: "Crafting a compelling and fundable research proposal.", icon: FileText },
    { title: "Research Methodology", description: "Designing robust research frameworks and methodologies.", icon: Microscope },
    { title: "Collaboration Matching", description: "Connecting you with leading researchers and institutions.", icon: Users },
]

export default function HigherStudiesPage() {
    return (
        <div className="bg-secondary/30">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Graduation caps in the air"
                    data-ai-hint="graduation ceremony"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Higher Studies Proposals</h1>
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">PhD & PostDoc Support</span>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Your Partner in Academic Advancement</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                        Navigating the path to a PhD or Postdoctoral position requires a meticulously crafted research proposal. We offer specialized guidance to help aspiring academics formulate innovative and impactful research proposals that stand out.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {supportAreas.map(area => (
                            <Card key={area.title} className="text-left transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <CardHeader>
                                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
                                        <area.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{area.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
