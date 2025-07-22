
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getConferences, Conference } from "@/services/conferenceService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ConferencePage() {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConferenceData = async () => {
      setIsLoading(true);
      try {
        const allConferences = await getConferences();
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // Find the most recent upcoming conference
        const upcoming = allConferences
          .filter(conf => {
              try {
                  return new Date(conf.date) >= now;
              } catch (e) {
                  return false;
              }
          })
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        
        if (upcoming.length > 0) {
            setConference(upcoming[0]);
        } else if (allConferences.length > 0) {
            // Fallback to the most recently created conference if no upcoming ones are found
            setConference(allConferences[0]);
        }

      } catch (error) {
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
  }, [toast]);

  if (isLoading) {
    return (
        <div className="container py-12 md:py-24">
             <div className="text-center mb-12">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
            <Card className="overflow-hidden">
                <Skeleton className="h-[400px] w-full" />
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
        <div className="relative h-[400px] w-full">
            <Image src={conference.imageSrc} alt={conference.title} fill className="object-cover" data-ai-hint="conference event" />
        </div>
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
