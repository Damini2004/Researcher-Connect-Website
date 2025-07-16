import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileText, Search, Edit, ShieldCheck, ArrowRight } from "lucide-react";

const patentServices = [
    {
        icon: Search,
        title: "Patentability Search",
        description: "Conducting thorough prior art searches to assess the novelty and non-obviousness of your invention."
    },
    {
        icon: Edit,
        title: "Patent Drafting",
        description: "Preparing a detailed and robust patent application that meets all statutory requirements."
    },
    {
        icon: FileText,
        title: "Filing & Prosecution",
        description: "Managing the entire filing process and responding to office actions from the patent office."
    },
    {
        icon: ShieldCheck,
        title: "Maintenance & Litigation",
        description: "Assisting with annuity payments to maintain your patent and providing support for infringement cases."
    }
];

export default function PatentPage() {
    return (
        <div className="bg-secondary/30">
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Patent Services</h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Secure exclusive rights to your inventions with our comprehensive patent services. From initial search and drafting to filing and prosecution, our experienced team guides you through every step of the complex patenting process to protect your valuable intellectual property.
                        </p>
                        <Button size="lg" className="mt-6">
                            Consult a Patent Expert <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="https://placehold.co/500x500.png"
                            width={500}
                            height={500}
                            alt="Patent Document"
                            data-ai-hint="patent invention"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>
            
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Our Patent Process</h2>
                        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                            We offer end-to-end support to transform your innovative ideas into protected assets.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {patentServices.map((service, index) => (
                             <Card key={index} className="text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full mb-3">
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
