
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search as SearchIcon, MapPin, ArrowRight, Workflow, FileSignature, Presentation, Handshake, LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const features: { title: string; description: string; icon: LucideIcon }[] = [
    { 
        title: "End-to-End Planning", 
        description: "From concept design to post-event reporting, every phase is professionally handled.", 
        icon: Workflow 
    },
    { 
        title: "Submission & Review Systems", 
        description: "Digital workflows for abstract handling, peer review, and program scheduling.", 
        icon: FileSignature 
    },
    { 
        title: "Hybrid & Virtual Capability", 
        description: "Seamless participation for global audiences through modern online platforms.", 
        icon: Presentation 
    },
    { 
        title: "Sponsor & Speaker Coordination", 
        description: "Attract high-value sponsors and engage world-class speakers with ease.", 
        icon: Handshake 
    },
];

const usageStats = [
    { value: "12,000", label: "Papers Submitted" },
    { value: "8,500", label: "People on Program Committee" },
    { value: "60,000,000", label: "TPMS Scores Requested" },
    { value: "3,000,000", label: "Reviewer Suggestions" },
    { value: "6,000,000", label: "Reviewer Conflicts" },
    { value: "1,800,000", label: "Reviewer Bids" },
    { value: "1,000,000", label: "Emails Sent" },
    { value: "80,000", label: "Files Uploaded" },
    { value: "30,000", label: "Discussion Posts" },
];
  

export default function ConferencesPage() {
  const [allConferences, setAllConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;


  const fetchConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch all conferences without any date filtering
      const data = await getConferences();
      setAllConferences(data.sort((a, b) => (b.dateObject?.getTime() || 0) - (a.dateObject?.getTime() || 0)));
    } catch (error) {
      console.error("Error fetching conferences:", error);
      toast({
        title: "Error",
        description: "Could not fetch conferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const totalPages = Math.ceil(allConferences.length / ITEMS_PER_PAGE);
  const paginatedConferences = allConferences.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="bg-secondary/30">
        <section className="relative w-full h-[300px] bg-gray-800 text-white">
            <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=300&auto=format&fit=crop"
                alt="Conference Audience"
                data-ai-hint="conference audience"
                fill
                className="object-cover opacity-20"
            />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold tracking-tight">Conferences</h1>
            </div>
        </section>

         <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&h=800&auto=format&fit=crop"
                            alt="Team planning a conference"
                            data-ai-hint="team planning"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Comprehensive Conference Management</h2>
                        <p className="text-lg text-muted-foreground text-justify">
                        Hosting an academic conference is a defining moment for any institution — a chance to showcase expertise, attract global talent, and spark collaborations that shape the future of research. Our comprehensive conference management service handles every phase with care, precision, and strategic insight.

We assist with conference conceptualization, helping you define impactful themes, structure calls for papers, and create clear submission guidelines. Our team designs modern, responsive websites to attract participants and streamline registration. Abstracts, reviews, and program schedules are handled via intelligent digital workflows, ensuring smooth communication between authors, reviewers, and organizers.

We also coordinate speaker invitations, sponsorship packages, and exhibitor opportunities, giving your event both academic depth and financial sustainability. For virtual and hybrid events, we integrate high-quality streaming platforms with real-time Q&A, networking, and poster sessions — creating a truly global reach. For in-person events, we oversee venue booking, travel support, compliance, and on-site management, so every guest feels welcome and informed.

After the event, we provide professional proceedings preparation, indexing support, and impact reporting, helping your conference leave a measurable footprint in the academic world.</p>
                         <Button size="lg" asChild>
                            <Link href="/contact-us">
                                Plan Your Conference <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Our Key Features</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        We provide a complete suite of services to ensure your conference is a success.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center bg-background transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <CardHeader className="items-center">
                                <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                                  <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-base">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-muted-foreground text-xs">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <div className="py-12 md:py-16 bg-background">
           <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-12">
                    <section>
                        <Card className="mb-12 bg-gradient-to-br from-background via-background to-primary/5 border-none shadow-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-center mb-6 text-foreground">Find International Conference</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="relative md:col-span-3">
                                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                                        <Input
                                            type="text"
                                            placeholder="Search by conference name, country, or keyword..."
                                            className="w-full h-12 pl-12 pr-28 rounded-full"
                                        />
                                        <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-6 rounded-full">
                                            Search
                                        </Button>
                                    </div>
                                    <Select><SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger><SelectContent><SelectItem value="ai">AI</SelectItem></SelectContent></Select>
                                    <Input type="text" placeholder="Search by country..." />
                                    <Select><SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger><SelectContent><SelectItem value="aug">August</SelectItem></SelectContent></Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {isLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-64 w-full" /></Card>
                                ))
                            ) : paginatedConferences.length > 0 ? (
                                paginatedConferences.map(conference => (
                                    <Link key={conference.id} href={`/conference/${conference.id}`} className="block">
                                        <Card className="overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group h-full">
                                            <div className="relative w-full h-48">
                                                <Image 
                                                    src={conference.imageSrc || "https://placehold.co/400x200.png"}
                                                    alt={conference.title}
                                                    fill
                                                    data-ai-hint="conference event"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                                <div className="absolute bottom-0 left-0 p-4">
                                                    <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
                                                        {conference.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <CardContent className="p-0 flex-grow space-y-3 text-sm text-muted-foreground">
                                                    <p className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-primary"/>
                                                        <span>{conference.date}</span>
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-primary"/>
                                                        <span>{conference.location}</span>
                                                    </p>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-16 col-span-1 md:col-span-2 lg:col-span-3">
                                    <p className="text-muted-foreground">
                                        No conferences found. Please check back later.
                                    </p>
                                </div>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex rounded-md shadow-sm">
                                <Button
                                    variant="outline"
                                    className="rounded-r-none"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                    key={i + 1}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    className="rounded-none"
                                    onClick={() => handlePageChange(i + 1)}
                                    >
                                    {i + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    className="rounded-l-none"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                                </nav>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
}
