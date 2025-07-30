
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
        
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <section>
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

                        <div className="space-y-6">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-24 w-full" /></Card>
                                ))
                            ) : upcomingConferences.length > 0 ? (
                                upcomingConferences.map(conference => (
                                    <Card key={conference.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                                            <Image src={conference.imageSrc} alt={conference.shortTitle} width={120} height={120} className="w-28 h-28 object-contain" data-ai-hint="logo brand"/>
                                            <div className="text-center md:text-left flex-1 space-y-2">
                                                <h4 className="font-bold text-base hover:text-primary"><Link href={`/conference/${conference.id}`}>{conference.title}</Link></h4>
                                                <p className="text-sm text-primary font-semibold flex items-center justify-center md:justify-start gap-2"><Calendar className="h-4 w-4"/>{conference.date}</p>
                                            </div>
                                            <div className="text-center md:text-right space-y-2">
                                                 <p className="text-sm font-bold flex items-center justify-center md:justify-end gap-2 text-primary hover:underline"><MapPin className="h-4 w-4" /> {conference.location}</p>
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
