

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
import { Calendar, MapPin, Search as SearchIcon, Eye, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function UpcomingConferencesPage() {
  const [upcomingConferences, setUpcomingConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAndFilterConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getConferences();
      const now = new Date();
      const upcoming = data
        .filter(
          (conf) => conf.dateObject && conf.dateObject.getTime() >= now.getTime()
        )
        .sort((a, b) => a.dateObject!.getTime() - b.dateObject!.getTime());

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
  }, [toast]);

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {isLoading ? (
                                [...Array(6)].map((_, i) => (
                                    <Card key={i} className="p-4"><Skeleton className="h-64 w-full" /></Card>
                                ))
                            ) : upcomingConferences.length > 0 ? (
                                upcomingConferences.map(conference => (
                                    <Card key={conference.id} className="overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                                        <div className="relative w-full h-48">
                                            <Image 
                                                src={conference.imageSrc || "https://placehold.co/400x200.png"}
                                                alt={conference.title}
                                                fill
                                                data-ai-hint="conference event"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <CardHeader className="p-0">
                                                <CardTitle className="text-lg font-bold line-clamp-2 leading-snug h-14 group-hover:text-primary transition-colors">
                                                    <Link href={`/conference/${conference.id}`}>{conference.title}</Link>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0 flex-grow pt-4 space-y-3 text-sm text-muted-foreground">
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
                                                <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold group-hover:gap-2 transition-all duration-300">
                                                    <Link href={`/conference/${conference.id}`}>
                                                       View Details <ArrowRight className="h-4 w-4"/>
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
                </aside>
            </div>
        </div>
    </div>
  );
}
