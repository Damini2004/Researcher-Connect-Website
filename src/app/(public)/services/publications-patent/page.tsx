
// src/app/(public)/services/publications-patent/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, ChevronRight, ShieldCheck, Edit, Award, Search, BookOpen, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { getCurrentDateInIndia } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/forms/contact-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const services = [
    {
        title: "Journal Targeting",
        description:
          "Identify the most impactful and suitable journals for your work.",
        icon: Search,
      },
      {
        title: "Manuscript Preparation",
        description:
          "Edit for clarity, compliance, and academic impact.",
        icon: Edit,
      },
      {
        title: "Peer Review Strategy",
        description:
          "Manage revisions and responses for smooth acceptance.",
        icon: FileText,
      },
      {
        title: "Ethical Publishing",
        description:
          "Ensure adherence to best practices and global standards.",
        icon: ShieldCheck,
      },
      {
        title: "Prior-Art Searches",
        description:
          "Ensure originality and minimize risk by evaluating existing technologies.",
        icon: Search,
      },
      {
        title: "Drafting & Filing",
        description:
          "Prepare strong, compliant applications for local and global filings.",
        icon: Edit,
      },
      {
        title: "Jurisdictional Strategy",
        description:
          "Plan protection across multiple countries efficiently.",
        icon: ShieldCheck,
      },
      {
        title: "Tech Transfer Support",
        description:
          "Facilitate commercialization and licensing of research innovations.",
        icon: BookOpen,
      },
  ];
  

export default function PublicationsPatentPage() {
    const [webinars, setWebinars] = React.useState<Webinar[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { toast } = useToast();
    const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState("date-asc");

    React.useEffect(() => {
        setCurrentDate(getCurrentDateInIndia());
    }, []);

    React.useEffect(() => {
        if (!currentDate) return;

        const fetchWebinars = async () => {
            setIsLoading(true);
            try {
                const allWebinars = await getWebinars();
                const upcoming = allWebinars
                    .filter(webinar => webinar.dateObject && webinar.dateObject.getTime() >= currentDate.getTime())
                    .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
                setWebinars(upcoming);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not fetch upcoming webinars.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchWebinars();
    }, [toast, currentDate]);

    const filteredAndSortedWebinars = React.useMemo(() => {
        return webinars
            .filter(webinar =>
                webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                webinar.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                switch (sortOrder) {
                    case "date-asc":
                        return a.dateObject.getTime() - b.dateObject.getTime();
                    case "date-desc":
                        return b.dateObject.getTime() - a.dateObject.getTime();
                    case "title-asc":
                        return a.title.localeCompare(b.title);
                    case "title-desc":
                        return b.title.localeCompare(a.title);
                    default:
                        return 0;
                }
            });
    }, [webinars, searchTerm, sortOrder]);


    return (
        <div className="bg-secondary/30">
            <section className="relative w-full h-[500px] bg-gray-800 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&h=300&auto=format&fit=crop"
                    alt="Team reviewing documents"
                    data-ai-hint="team review"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight">Publications & Patent Consultancy</h1>
                </div>
            </section>
            
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <Image
        alt="Innovation and Research"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        height="310"
        src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800&auto=format&fit=crop"
        data-ai-hint="researcher scientist"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
            From Lab to Legacy
          </h2>
          <p className="max-w-[600px] text-justify text-muted-foreground">
            Protecting intellectual property is crucial for safeguarding innovation and securing commercial
            or academic advantages. Researcher Connect provides specialized patent consultancy, assisting
            researchers and institutions with prior-art searches, drafting, filing strategies, and
            jurisdictional guidance. We simplify complex legal frameworks, ensuring innovations are
            adequately protected while meeting regulatory timelines. Our team coordinates with legal
            experts to strengthen patent claims, improve approval success, and support technology transfer
            initiatives. Whether securing local or international rights, we help innovators navigate the
            process with clarity and confidence, ensuring that their intellectual contributions are
            preserved, valued, and positioned for future development or commercialization.
          </p>
        </div>
        <Button asChild size="lg" className="w-fit">
          <Link href="/contact-us">
            Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
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

                    <div className="mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight">Upcoming Webinars</h2>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                                Join our expert-led online sessions to stay ahead of the curve.
                            </p>
                        </div>

                         <Card className="mb-8 bg-gradient-to-br from-background via-background to-primary/5 border-none shadow-sm">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="relative md:col-span-2">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                                        <Input
                                            type="text"
                                            placeholder="Search by webinar title or description..."
                                            className="w-full h-12 pl-12"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Select value={sortOrder} onValueChange={setSortOrder}>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Sort by..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="date-asc">Date: Nearest First</SelectItem>
                                            <SelectItem value="date-desc">Date: Furthest First</SelectItem>
                                            <SelectItem value="title-asc">Title: A-Z</SelectItem>
                                            <SelectItem value="title-desc">Title: Z-A</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="h-[450px] w-full rounded-lg" />
                                ))
                            ) : filteredAndSortedWebinars.length > 0 ? (
                                filteredAndSortedWebinars.map((webinar) => (
                                    <Card key={webinar.id} className="flex flex-col w-full mx-auto overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                                        <div className="relative h-[200px] w-full overflow-hidden">
                                            <Image src={webinar.imageSrc} alt={webinar.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint="webinar event" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <div className="flex flex-col flex-grow p-6">
                                            <CardHeader className="p-0 mb-4">
                                                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 h-14">{webinar.title}</CardTitle>
                                                <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{webinar.date}</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0 flex-grow">
                                                <p className="text-muted-foreground line-clamp-4">{webinar.description}</p>
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
                                                        <DialogTitle>Register for: {webinar.title}</DialogTitle>
                                                        <DialogDescription>
                                                        Please fill out your details below to register for the webinar.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex-grow overflow-y-auto pr-6 -mr-2">
                                                        <ScrollArea className="h-full">
                                                            <ContactForm 
                                                                inquiryType="Webinar Registration"
                                                                details={webinar.title}
                                                            />
                                                        </ScrollArea>
                                                    </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </CardFooter>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground col-span-full py-16">
                                    <p>No upcoming webinars match your search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
