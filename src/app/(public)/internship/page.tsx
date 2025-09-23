

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getInternships, Internship } from "@/services/internshipService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import ContactForm from "@/components/forms/contact-form";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, ArrowRight, Search, CheckCircle, BrainCircuit, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship Program',
  description: 'Explore internship opportunities at Researcher Connect. Gain hands-on experience, expert mentorship, and career development in fields like AI, marketing, and editorial services.',
};


const internshipFeatures = [
    {
        icon: BrainCircuit,
        title: "Hands-On Experience",
        description: "Work on real-world projects and gain practical skills in your field of interest, from AI development to digital marketing."
    },
    {
        icon: Users,
        title: "Expert Mentorship",
        description: "Receive guidance and support from experienced professionals and researchers who are leaders in their domains."
    },
    {
        icon: CheckCircle,
        title: "Career Development",
        description: "Build your resume, expand your professional network, and get a head start on your career path with a valuable internship."
    }
];

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await getInternships();
        setInternships(data);
      } catch (error) {
        console.error("Failed to fetch internships", error);
        toast({
            title: "Error",
            description: "Could not load internship opportunities. Please try again later.",
            variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInternships();
  }, [toast]); 

  const handleDownloadBrochure = (brochureUrl: string, internshipName: string) => {
    if (!brochureUrl) return;

    const link = document.createElement('a');
    link.href = brochureUrl;

    const mimeType = brochureUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let fileExtension = 'file';
    if (mimeType && mimeType.length > 1) {
        if (mimeType[1] === 'application/pdf') fileExtension = 'pdf';
        else if (mimeType[1] === 'application/msword') fileExtension = 'doc';
        else if (mimeType[1] === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') fileExtension = 'docx';
    }

    link.download = `Brochure-${internshipName.replace(/\s/g, '_')}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const searchMatch = searchTerm === "" || 
        internship.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        internship.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const domainMatch = filterDomain === 'all' || internship.name.toLowerCase().includes(filterDomain.toLowerCase());

      return searchMatch && domainMatch;
    });
  }, [internships, searchTerm, filterDomain]);

  const uniqueDomains = useMemo(() => {
    const domains = new Set<string>();
    internships.forEach(i => {
        // A simple way to infer domain from title, could be a dedicated field later
        if (i.name.toLowerCase().includes('ai')) domains.add('ai');
        if (i.name.toLowerCase().includes('marketing')) domains.add('marketing');
        if (i.name.toLowerCase().includes('editorial')) domains.add('editorial');
    });
    return Array.from(domains);
  }, [internships]);

  return (
    <div className="bg-background">
        <section className="relative w-full h-[300px] bg-gray-800 text-white">
            <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=300&auto=format&fit=crop"
                alt="Students collaborating"
                data-ai-hint="team collaboration"
                fill
                className="object-cover opacity-20"
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Internship Program</h1>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&h=800&auto=format&fit=crop"
                        alt="Team working on a project"
                        data-ai-hint="team project"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Gain Real-World Experience</h2>
                    <p className="text-lg text-muted-foreground text-justify">
                        Our internship program is designed to bridge the gap between academic theory and practical industry application. We offer opportunities for students and early-career researchers to work alongside experienced professionals on meaningful projects. Whether your passion lies in artificial intelligence, digital marketing, or academic publishing, our internships provide a platform to develop your skills, build your professional network, and make a tangible impact.
                    </p>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Why Intern With Us?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {internshipFeatures.map((feature) => (
                        <Card key={feature.title} className="text-center bg-background transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full w-fit mb-3">
                                  <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-justify">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Current Opportunities</h2>
                <p className="mt-4 text-lg text-muted-foreground">Find an internship that matches your skills and interests.</p>
            </div>

            <Card className="mb-12 bg-gradient-to-br from-background via-background to-primary/5 border-none shadow-sm">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                            <Input
                                type="text"
                                placeholder="Search by title or keyword..."
                                className="w-full h-12 pl-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={filterDomain} onValueChange={setFilterDomain}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder="Filter by domain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Domains</SelectItem>
                                {uniqueDomains.map(domain => (
                                    <SelectItem key={domain} value={domain} className="capitalize">{domain}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {isLoading ? (
                <div className="flex items-center justify-center py-24">
                    <Logo className="h-32 w-32 animate-pulse" />
                </div>
            ) : filteredInternships.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {filteredInternships.map(internship => (
                    <Card key={internship.id} className="flex flex-col w-full max-w-sm mx-auto overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="relative h-[250px] w-full">
                        <Image src={internship.imageSrc} alt={internship.name} fill className="object-cover" data-ai-hint="internship opportunity"/>
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle>{internship.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow">
                            <p className="text-muted-foreground line-clamp-4">{internship.description}</p>
                        </CardContent>
                        <CardFooter className="p-0 mt-6 flex flex-col items-start gap-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                <Button className="w-full">
                                    Register Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>Apply for: {internship.name}</DialogTitle>
                                    <DialogDescription>
                                    Please fill out your details below to apply. We will get back to you shortly.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-grow overflow-y-auto pr-6 -mr-2">
                                    <ScrollArea className="h-full">
                                        <ContactForm 
                                            inquiryType="Internship Application"
                                            details={internship.name}
                                        />
                                    </ScrollArea>
                                </div>
                                </DialogContent>
                            </Dialog>
                            <Button 
                                variant="outline" 
                                className="w-full"
                                disabled={!internship.brochureUrl}
                                onClick={() => handleDownloadBrochure(internship.brochureUrl!, internship.name)}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Brochure
                            </Button>
                        </CardFooter>
                        </div>
                    </Card>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center text-center py-16 text-muted-foreground">
                    <p>No internship opportunities are available matching your criteria. Please check back later.</p>
                </div>
            )}
        </section>
    </div>
  );
}

    
