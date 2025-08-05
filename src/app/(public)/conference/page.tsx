
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Calendar, MapPin, Search as SearchIcon, Eye } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConferenceSidebarForm from "@/components/forms/conference-sidebar-form";


export default function ConferencesPage() {
  const [upcomingConferences, setUpcomingConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

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

  return (
    <div className="bg-secondary/30">
        
        <section className="relative w-full py-16 md:py-20 bg-gray-800 text-white overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop"
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
                                                <p className="flex items-center justify-center gap-2"><MapPin className="h-5 w-5 text-primary animate-pulse"/><span>{conference.location}</span></p>
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

        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <section>
                        <div className="max-w-5xl mx-auto border-t-4 border-red-600 shadow-lg rounded-b-lg mb-12 relative bg-background">
                            <div className="p-6">
                                <h3 className="font-bold text-center mb-4">Find International Conference</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Select><SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger><SelectContent><SelectItem value="ai">AI</SelectItem></SelectContent></Select>
                                    <Select><SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger><SelectContent><SelectItem value="usa">USA</SelectItem></SelectContent></Select>
                                    <Select><SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger><SelectContent><SelectItem value="aug">August</SelectItem></SelectContent></Select>
                                    <Button className="w-full bg-red-600 hover:bg-red-700"><SearchIcon className="mr-2 h-4 w-4" /> Search Event</Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-24 w-full" /></Card>
                                ))
                            ) : upcomingConferences.length > 0 ? (
                                upcomingConferences.map(conference => (
                                    <Card key={conference.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                                            <Image src={conference.imageSrc || 'https://placehold.co/120x120.png'} alt={conference.shortTitle} width={120} height={120} className="w-28 h-28 object-contain" data-ai-hint="logo brand"/>
                                            <div className="text-center md:text-left flex-1 space-y-2">
                                                <h4 className="font-bold text-base hover:text-primary"><Link href={`/conference/${conference.id}`}>{conference.title}</Link></h4>
                                                <p className="text-sm text-primary font-semibold flex items-center justify-center md:justify-start gap-2"><Calendar className="h-4 w-4"/>{conference.date}</p>
                                            </div>
                                            <div className="text-center md:text-right space-y-2">
                                                 <p className="text-sm font-bold flex items-center justify-center md:justify-end gap-2 text-primary hover:underline"><MapPin className="h-5 w-5 text-primary animate-pulse" /> {conference.location}</p>
                                                 <Link href={`/conference/${conference.id}`} className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center md:justify-end gap-1">
                                                    <Eye className="h-4 w-4"/> View Details
                                                 </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-muted-foreground">
                                        No upcoming conferences found. Please check back later.
                                    </p>
                                </div>
                            )}
                        </div>
                         {upcomingConferences.length > 0 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex rounded-md shadow-sm">
                                    <Button variant="outline" className="rounded-r-none">1</Button>
                                    <Button variant="outline" className="rounded-none">2</Button>
                                    <Button variant="outline" className="rounded-none">3</Button>
                                    <Button variant="outline" className="rounded-l-none">4</Button>
                                </nav>
                            </div>
                        )}
                    </section>
                </div>
                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                     <Card>
                        <CardHeader className="text-center bg-muted/50">
                            <CardTitle>Indexed By</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="https://logodix.com/logo/2038481.png" width={120} height={50} alt="DOAJ" data-ai-hint="logo brand" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="https://logodix.com/logo/1993463.png" width={120} height={50} alt="Scopus" data-ai-hint="logo company" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="https://logodix.com/logo/1712867.png" width={120} height={50} alt="EBSCO" data-ai-hint="logo tech" className="object-contain" /></div>
                                <div className="p-2 border rounded-md flex items-center justify-center"><Image src="https://logodix.com/logo/1101923.png" width={120} height={50} alt="Crossref" data-ai-hint="logo business" className="object-contain" /></div>
                           </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-600 text-white text-center p-6">
                        <h3 className="text-xl font-bold">Life Science Conferences</h3>
                        <Button variant="outline" className="mt-4 bg-white text-red-600 hover:bg-white/90">Visit Now</Button>
                    </Card>
                    <ConferenceSidebarForm />
                </aside>
            </div>
        </div>
    </div>
  );
}
