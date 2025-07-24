
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";

export default function UpcomingWebinarsPage() {
  const [upcomingWebinars, setUpcomingWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  useEffect(() => {
    if (!currentDate) return;

    const fetchAndFilterWebinars = async () => {
      setIsLoading(true);
      try {
        const allWebinars = await getWebinars();
        const upcoming = allWebinars
          .filter(webinar => webinar.dateObject && webinar.dateObject.getTime() >= currentDate.getTime())
          .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
        setUpcomingWebinars(upcoming);
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
    fetchAndFilterWebinars();
  }, [toast, currentDate]);

  return (
    <div className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Webinars</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Join our expert-led sessions to stay updated on the latest research and trends.
          </p>
        </div>
        
        {isLoading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="flex flex-col">
                        <Skeleton className="h-[200px] w-full" />
                        <CardHeader>
                           <Skeleton className="h-6 w-3/4 mb-2" />
                           <Skeleton className="h-5 w-1/2" />
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
             </div>
        ) : upcomingWebinars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                    <div className="relative h-[200px] w-full">
                        <Image src={webinar.imageSrc} alt={webinar.title} fill className="object-cover" data-ai-hint="webinar event" />
                    </div>
                    <CardHeader>
                    <CardTitle>{webinar.title}</CardTitle>
                    <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{webinar.date}</span>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{webinar.description}</p>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full">
                        Register Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        ) : (
             <div className="text-center py-16">
                <p className="text-muted-foreground">There are no upcoming webinars at the moment. Please check back later!</p>
            </div>
        )}
        </div>
    </div>
  );
}
