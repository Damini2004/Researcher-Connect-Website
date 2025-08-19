
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight, ShieldCheck, Edit, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    { title: "Patent Search & Analysis", description: "In-depth prior art searches to assess patentability.", icon: Search },
    { title: "Patent Drafting", description: "Expertly crafting patent applications to protect your inventions.", icon: Edit },
    { title: "Journal Publishing", description: "Assistance with manuscript preparation and submission to high-impact journals.", icon: BookOpen },
    { title: "IP Strategy", description: "Developing a comprehensive strategy to protect your intellectual assets.", icon: ShieldCheck },
];

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function PublicationsPatentPage() {
    return (
        <div className="bg-secondary/30">
            <section className="relative w-full h-[300px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Team reviewing documents"
                    data-ai-hint="team review"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Publications & Patent Consultancy</h1>
                    <div className="flex items-center text-sm text-white/80 mt-2">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-semibold text-white">Publications & Patent</span>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Protect and Publish Your Innovations</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            We provide a dual-focused consultancy to help you both protect your intellectual property through patents and disseminate your research through high-impact publications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <Card key={service.title}>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <service.icon className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-lg">{service.title}</CardTitle>
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
