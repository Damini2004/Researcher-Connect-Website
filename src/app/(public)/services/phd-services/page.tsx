
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, ChevronRight, Edit, Search, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    { title: "Topic Selection", description: "Identifying novel and viable research topics.", icon: Search },
    { title: "Literature Review", description: "Comprehensive review and synthesis of existing literature.", icon: BookMarked },
    { title: "Manuscript Writing", description: "From drafting to final polishing of your thesis or papers.", icon: Edit },
    { title: "Viva Voce Preparation", description: "Coaching and preparation for your thesis defense.", icon: Lightbulb },
];

export default function PhDServicePage() {
    return (
        <div className="bg-background">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Person writing at a desk"
                    data-ai-hint="research writing"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">End-to-End PhD Services</h1>
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">PhD Services</span>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Your Complete PhD Journey Support</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We provide comprehensive support for every stage of your PhD journey, from topic selection to final defense. Our team of experienced academics is here to guide you to success.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map(service => (
                            <Card key={service.title} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                      <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
