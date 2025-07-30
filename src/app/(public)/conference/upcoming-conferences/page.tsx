
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Search as SearchIcon, Info } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";


export default function UpcomingConferencesPage() {
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
        {/* Carousel Section */}
        <section className="relative w-full py-12 md:py-20 bg-gray-800 text-white overflow-hidden">
             <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1800&auto=format&fit=crop"
                alt="Conference background"
                fill
                className="object-cover opacity-20"
                data-ai-hint="conference audience"
            />
            <div className="relative container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
                    Upcoming International <span className="text-amber-400">Conference 2025</span>
                </h1>
                
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto mt-8"
                >
                    <CarouselContent className="-ml-4">
                        {(isLoading ? Array(4).fill({}) : upcomingConferences.slice(0, 4)).map((conference, index) => (
                            <CarouselItem key={isLoading ? index : conference.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    {isLoading ? (
                                        <Card className="bg-white text-black p-6 space-y-4 h-[240px]">
                                            <Skeleton className="w-24 h-12 mx-auto" />
                                            <Skeleton className="h-5 w-full" />
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </Card>
                                    ) : (
                                        <Card className="bg-white text-black p-6 flex flex-col items-center text-center shadow-lg h-[240px]">
                                           <Image src={conference.imageSrc || "https://placehold.co/100x50.png"} alt={conference.shortTitle} width={100} height={50} className="h-12 object-contain mb-4" data-ai-hint="logo brand"/>
                                           <h3 className="font-bold text-sm mb-3 h-16 line-clamp-3 flex-grow">{conference.title}</h3>
                                           <div className="text-xs text-muted-foreground space-y-2 mt-auto">
                                                <p className="flex items-center justify-center gap-2"><Calendar className="h-4 w-4" /> {conference.date}</p>
                                                <p className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4" /> {conference.location}</p>
                                           </div>
                                        </Card>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white border-none rounded-full" />
                    <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white border-none rounded-full" />
                </Carousel>
            </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
            {/* CPD Section */}
            <section>
                <h2 className="text-2xl font-bold text-center mb-6">CPD Accredited IFERP Conferences listed in CPD directory</h2>
                <div className="max-w-4xl mx-auto bg-background p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Image src="https://logodix.com/logo/796417.png" width={100} height={100} alt="CPD Standards Office" data-ai-hint="logo brand"/>
                        <div>
                            <h3 className="font-bold">The CPD Standards Office</h3>
                            <p className="text-sm text-muted-foreground">CPD PROVIDER: 41182<br/>2024-2026</p>
                            <Link href="#" className="text-sm text-primary hover:underline">www.cpdstandards.com</Link>
                        </div>
                    </div>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">Get CPD Directory - Listed IFERP Conferences</Button>
                </div>
            </section>

            {/* Scopus Section */}
            <section>
                 <h2 className="text-2xl font-bold text-center mb-4">List of Upcoming Scopus International Conference 2025-2026</h2>
                 <p className="text-sm text-muted-foreground max-w-4xl mx-auto mb-8">
                    <span className="text-primary font-semibold">&raquo;</span> Engineering and technology are exceptionally dynamic sectors. They are constantly evolving and expanding. Experts, professionals, and academics in the field have to try and keep up with all the latest developments. Every upcoming scopus conference in 2025 - 2026 will provide professionals from various engineering disciplines with knowledge of cutting-edge tools, technology, and skills in their main respective sub-disciplines. They are also a great opportunity for professionals to connect with peers around the world
                 </p>

                <div className="max-w-5xl mx-auto border-t-2 border-primary shadow-lg rounded-b-lg mb-12 relative bg-background">
                    <div className="absolute -top-[2px] left-0 w-0 h-0 border-b-[30px] border-b-transparent border-l-[30px] border-l-primary"></div>
                    <div className="absolute -top-[2px] right-0 w-0 h-0 border-b-[30px] border-b-transparent border-r-[30px] border-r-primary"></div>
                     <div className="p-6 pt-10">
                        <h3 className="font-bold text-center mb-4">Find International Conference</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Select><SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger><SelectContent><SelectItem value="ai">AI</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger><SelectContent><SelectItem value="usa">USA</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Select Month" /></SelectTrigger><SelectContent><SelectItem value="aug">August</SelectItem></SelectContent></Select>
                            <Button className="w-full bg-red-600 hover:bg-red-700"><SearchIcon className="mr-2 h-4 w-4" /> Search Event</Button>
                        </div>
                     </div>
                </div>

                <div className="space-y-6 max-w-5xl mx-auto">
                    {isLoading ? (
                         [...Array(3)].map((_, i) => (
                             <Card key={i} className="p-4"><Skeleton className="h-24 w-full" /></Card>
                         ))
                    ) : upcomingConferences.length > 0 ? (
                        upcomingConferences.map(conference => (
                            <Card key={conference.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 md:col-span-8 p-4">
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <Image src={conference.imageSrc} alt={conference.shortTitle} width={80} height={80} className="w-20 h-20 object-contain" data-ai-hint="logo brand"/>
                                            <div className="text-center md:text-left flex-1 space-y-1">
                                                <h4 className="font-bold text-base hover:text-primary"><Link href={`/conference/${conference.id}`}>{conference.title}</Link></h4>
                                                <p className="text-sm text-primary font-semibold flex items-center justify-center md:justify-start gap-2"><Calendar className="h-4 w-4"/>{conference.date}</p>
                                                <p className="text-sm font-bold flex items-center justify-center md:justify-start gap-2"><MapPin className="h-4 w-4 text-primary" /> {conference.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 bg-muted/50 p-4 flex flex-col items-center justify-center text-center gap-2">
                                       <h5 className="font-semibold text-sm mb-2">Indexed By</h5>
                                       <div className="grid grid-cols-2 gap-2">
                                            <Image src="https://logodix.com/logo/2038481.png" width={100} height={40} alt="DOAJ" data-ai-hint="logo brand" className="object-contain" />
                                            <Image src="https://logodix.com/logo/1993463.png" width={100} height={40} alt="Scopus" data-ai-hint="logo company" className="object-contain" />
                                            <Image src="https://logodix.com/logo/1712867.png" width={100} height={40} alt="EBSCO" data-ai-hint="logo tech" className="object-contain" />
                                            <Image src="https://logodix.com/logo/1101923.png" width={100} height={40} alt="Crossref" data-ai-hint="logo business" className="object-contain" />
                                       </div>
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
            </section>
        </div>
    </div>
  );
}
