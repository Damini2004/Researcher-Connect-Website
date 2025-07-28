
"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { format } from "date-fns";

export default function UpcomingConferencesPage() {
  const [allConferences, setAllConferences] = useState<Conference[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  const fetchAndFilterConferences = useCallback(async (date: Date) => {
    setIsLoading(true);
    try {
      const data = await getConferences();
      const upcoming = data
        .filter(
          (conf) =>
            conf.dateObject && conf.dateObject.getTime() >= date.getTime()
        )
        .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
      
      setAllConferences(upcoming);
      setFilteredConferences(upcoming);

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
    if (currentDate) {
      fetchAndFilterConferences(currentDate);
    }
  }, [currentDate, fetchAndFilterConferences]);

  const ConferenceListItem = ({ conference }: { conference: Conference }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
        <Image src="https://logodix.com/logo/796417.png" alt={`${conference.shortTitle} logo`} width={100} height={100} data-ai-hint="logo brand" className="w-20 h-20 object-contain"/>
        <div className="flex-1 text-center md:text-left">
          <Link href={`/conference/${conference.id}`} className="font-semibold text-lg hover:text-primary transition-colors">{conference.title}</Link>
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
            <Calendar className="h-4 w-4"/>
            <span>{format(new Date(conference.startDate), "dd MMM")} - {format(new Date(conference.endDate), "dd MMM yyyy")}</span>
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary"/>
                {conference.location}
            </p>
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href={`/conference/${conference.id}`}>
                    View Details <ChevronRight className="h-4 w-4 ml-1"/>
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-secondary/30">
        {/* --- Carousel Hero --- */}
        <section className="relative w-full h-[350px] bg-gray-800 text-white overflow-hidden">
             <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=350&auto=format&fit=crop"
                alt="Conference background"
                fill
                className="object-cover opacity-30"
                data-ai-hint="conference audience"
            />
            <div className="relative z-10 container h-full flex flex-col justify-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-center mb-8">Upcoming International Conference 2025</h1>
                {isLoading ? (
                    <div className="flex justify-center items-center h-48"><Skeleton className="w-3/4 h-3/4"/></div>
                ) : (
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent>
                            {allConferences.slice(0, 5).map((conf) => (
                                <CarouselItem key={conf.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                    <Card className="bg-background/90 text-foreground">
                                        <CardContent className="flex flex-col items-center text-center p-6 space-y-3">
                                            <Image src="https://logodix.com/logo/796417.png" data-ai-hint="logo brand" alt="logo" width={60} height={60}/>
                                            <p className="font-semibold h-20 line-clamp-3">{conf.title}</p>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {conf.date}</p>
                                                <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {conf.location}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-[-50px]" />
                        <CarouselNext className="right-[-50px]" />
                    </Carousel>
                )}
            </div>
        </section>

        {/* --- Main Content --- */}
        <div className="container py-12 md:py-16 space-y-12">
            
            {/* --- CPD Section --- */}
            <section className="bg-background p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
                <Image src="https://logodix.com/logo/1101923.png" alt="CPD Standards Office" width={120} height={120} data-ai-hint="logo tech" className="object-contain"/>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">CPD Accredited IFERP Conferences listed in CPD directory</h2>
                    <p className="text-muted-foreground mt-2">CPD PROVIDER: 41182 | 2024-2026</p>
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get CPD Directory - Listed IFERP Conferences
                </Button>
            </section>

            {/* --- List & Filter Section --- */}
            <section>
                 <div className="mb-8">
                    <h2 className="text-2xl font-bold">List of Upcoming Scopus International Conference 2025-2026</h2>
                    <p className="text-muted-foreground mt-2">
                        Engineering and technology are exceptionally dynamic sectors. They are constantly evolving and expanding. Experts, professionals, and academics in the field have to try and keep up with all the latest developments. Every upcoming scopus conference in 2025 - 2026 will provide professionals from various engineering disciplines with knowledge of cutting-edge tools, technology, and skills in their respective sub-disciplines.
                    </p>
                </div>
                
                <Card className="p-4 mb-8 border-primary/50 border-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <p className="font-semibold md:col-span-1">Find International Conference</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-3">
                            <Select><SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger><SelectContent><SelectItem value="ai">AI & ML</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger><SelectContent><SelectItem value="usa">USA</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger><SelectContent><SelectItem value="aug">August</SelectItem></SelectContent></Select>
                        </div>
                    </div>
                </Card>

                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredConferences.map(conf => <ConferenceListItem key={conf.id} conference={conf}/>)}
                    </div>
                )}
            </section>
        </div>
    </div>
  );
}

    