

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
import { Calendar, Search as SearchIcon, Eye, MapPin, ArrowRight } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";


export default function ConferencesPage() {
  const [upcomingConferences, setUpcomingConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;


   useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  const fetchAndFilterConferences = useCallback(async () => {
    if (!currentDate) return;

    setIsLoading(true);
    try {
      const data = await getConferences();
      const upcoming = data
        .filter(
          (conf) => conf.dateObject && conf.dateObject.getTime() >= currentDate.getTime()
        )
        .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());

      setUpcomingConferences(upcoming);
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
  }, [toast, currentDate]);

  useEffect(() => {
    fetchAndFilterConferences();
  }, [fetchAndFilterConferences]);

  const totalPages = Math.ceil(upcomingConferences.length / ITEMS_PER_PAGE);
  const paginatedConferences = upcomingConferences.slice(
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
        
        <section className="relative w-full py-16 md:py-20 bg-gray-800 text-white overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto-format=fit=crop"
                alt="Conference background"
                fill
                className="object-cover opacity-20"
                data-ai-hint="conference audience"
            />
            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
                    Upcoming International <span className="text-amber-400">Conference 2025</span>
                </h2>
                {isLoading ? (
                    <div className="flex justify-center"><Skeleton className="h-64 w-full max-w-4xl" /></div>
                ) : upcomingConferences.length > 0 && (
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                            {upcomingConferences.slice(0, 6).map((conference) => (
                                <CarouselItem key={conference.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 h-full">
                                        <Card className="flex flex-col h-full bg-white text-black text-center p-6 shadow-lg transform transition-all hover:-translate-y-2">
                                            <div className="flex-grow space-y-3">
                                                <Image src={conference.imageSrc || 'https://placehold.co/100x100.png'} alt={conference.shortTitle} width={100} height={100} className="w-24 h-24 object-contain mx-auto" data-ai-hint="logo brand"/>
                                                <h4 className="font-semibold text-sm line-clamp-3">{conference.title}</h4>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200 text-sm space-y-2 text-muted-foreground">
                                                <p className="flex items-center justify-center gap-2"><Calendar className="h-4 w-4 text-primary"/><span>{conference.date}</span></p>
                                                <p className="flex items-center justify-center gap-2">
                                                    <Image src="/gps-tracker.gif" alt="Location" width={24} height={24} unoptimized />
                                                    <span>{conference.location}</span>
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 bg-white/80 text-black hover:bg-white" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 bg-white/80 text-black hover:bg-white" />
                    </Carousel>
                )}
            </div>
        </section>

        <div className="py-12 md:py-16">
           <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {isLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-64 w-full" /></Card>
                                ))
                            ) : paginatedConferences.length > 0 ? (
                                paginatedConferences.map(conference => (
                                    <Card key={conference.id} className="overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group border-2 border-transparent hover:border-primary/30">
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
                                                <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight">
                                                    <Link href={`/conference/${conference.id}`} className="hover:text-amber-300 transition-colors stretched-link">
                                                        {conference.title}
                                                    </Link>
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
                                            <CardFooter className="p-0 pt-6">
                                                <Button asChild variant="outline" className="w-full">
                                                    <Link href={`/conference/${conference.id}`}>
                                                       View Details <ArrowRight className="ml-2 h-4 w-4"/>
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-16 col-span-1 md:col-span-2">
                                    <p className="text-muted-foreground">
                                        No upcoming conferences found. Please check back later.
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
                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                </aside>
            </div>
        </div>
    </div>
  );
}
