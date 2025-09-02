
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronRight, FileText, Microscope, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const supportAreas = [
    { title: "Proposal Writing", description: "Crafting a compelling and fundable research proposal.", icon: FileText },
    { title: "Research Methodology", description: "Designing robust research frameworks and methodologies.", icon: Microscope },
    { title: "Collaboration Matching", description: "Connecting you with leading researchers and institutions.", icon: Users },
]

export default function HigherStudiesPage() {
    return (
        <div>
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
                </div>
            </section>

             <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <Image
                            alt="Research Planning"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            height="310"
                            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
                            data-ai-hint="research planning"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Academic Future</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Navigating the path to a PhD or Postdoctoral position requires a meticulously crafted research proposal. We offer specialized guidance to help aspiring academics formulate innovative and impactful research proposals that stand out and secure funding.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Your Partner in Academic Advancement</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                        We provide end-to-end support to ensure your proposal is compelling, rigorous, and ready for submission.
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
                     <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/contact-us">Get Proposal Support <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
