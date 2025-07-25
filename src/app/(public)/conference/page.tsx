
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { getCurrentDateInIndia } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ConferencePage() {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(getCurrentDateInIndia());
  }, []);

  useEffect(() => {
    if (!currentDate) return;
    
    const fetchConferenceData = async () => {
      setIsLoading(true);
      try {
        const allConferences = await getConferences();

        // **CRITICAL FIX**: Use UTC-normalized dates for reliable filtering.
        // Find the next upcoming conference, sorted by date
        const upcoming = allConferences
          .filter(conf => conf.dateObject && conf.dateObject.getTime() >= currentDate.getTime())
          .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
        
        if (upcoming.length > 0) {
            setConference(upcoming[0]);
        } else if (allConferences.length > 0) {
            // Fallback to the most recently created conference if no upcoming ones are found
            const sortedByCreation = [...allConferences].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setConference(sortedByCreation[0]);
        }

      } catch (error) {
        console.error("Error fetching conference data:", error);
        toast({
          title: "Error",
          description: "Could not load conference data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchConferenceData();
  }, [toast, currentDate]);

  if (isLoading) {
    return (
        <div className="container py-12 md:py-24">
             <div className="text-center mb-12">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
            <Card className="overflow-hidden">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-5 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-5 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 w-32 ml-4" />
                </CardFooter>
            </Card>
        </div>
    )
  }

  if (!conference) {
    return (
        <div className="container py-12 md:py-24 text-center">
             <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Conferences</h1>
             <p className="mt-4 text-lg text-muted-foreground">Innovate, Collaborate, and Inspire: The Future of Interdisciplinary Research.</p>
             <div className="mt-12 text-muted-foreground">
                 No conferences are scheduled at this time. Please check back later.
             </div>
        </div>
    );
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{conference.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">Innovate, Collaborate, and Inspire: The Future of Interdisciplinary Research.</p>
      </div>

      <Card className="overflow-hidden shadow-xl border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl">Join us in {conference.location} | {conference.date}</CardTitle>
          <CardDescription>
            Our annual conference brings together the brightest minds from across the globe. Present your work, network with peers, and learn from leading experts in your field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{conference.description}</p>
        </CardContent>
        <CardFooter>
          <Button size="lg">Register Now</Button>
          <Button variant="outline" className="ml-4">Call for Papers</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
