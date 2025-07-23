
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getConferences, Conference } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpcomingConferencesPage() {
  const [upcomingConferences, setUpcomingConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndFilterConferences = async () => {
      setIsLoading(true);
      try {
        const allConferences = await getConferences();
        
        // Get today's date at midnight in the local timezone
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const upcoming = allConferences.filter(conf => {
            return conf.dateObject >= now;
        });

        setUpcomingConferences(upcoming);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch conferences.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndFilterConferences();
  }, [toast]);

  return (
    <div className="bg-secondary/50">
        <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Conferences</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of researchers and innovators at our upcoming events. Explore the frontiers of science and technology.
            </p>
        </div>
        
        {isLoading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="flex flex-col">
                        <CardHeader>
                           <Skeleton className="h-6 w-3/4 mb-2" />
                           <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-5 w-1/2" />
                           </div>
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
        ) : upcomingConferences.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingConferences.map((conference) => (
                <Card key={conference.id} className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                    <CardTitle>{conference.title}</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{conference.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{conference.location}</span>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{conference.description}</p>
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
                <p className="text-muted-foreground">There are no upcoming conferences at the moment. Please check back later!</p>
            </div>
        )}
        </div>
    </div>
  );
}
