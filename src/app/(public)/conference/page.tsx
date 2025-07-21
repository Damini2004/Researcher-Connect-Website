
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
        const data = await getConferences();
        // Display the most recently created conference
        if (data.length > 0) {
          setConference(data[0]);
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

  // Use the fetched conference if available, otherwise fall back to static data.
  const displayConference = conference || {
      title: "International Conference on Future Technologies",
      date: "December 15-17, 2024",
      location: "Virtual Event",
      description: "Join us for the premier international conference on the future of technology. This event brings together researchers, industry leaders, and policymakers to discuss the latest innovations and their impact on society. Explore topics ranging from artificial intelligence and quantum computing to sustainable tech and beyond.",
      imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&h=400&auto=format&fit=crop"
  };

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{displayConference.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">Innovate, Collaborate, and Inspire: The Future of Interdisciplinary Research.</p>
      </div>

      <Card className="overflow-hidden shadow-xl border-primary/10">
        <Image 
          src={displayConference.imageSrc}
          width={1200}
          height={400}
          alt="Conference banner"
          data-ai-hint="conference academic"
          className="w-full h-[400px] object-cover"
        />
        <CardHeader>
          <CardTitle className="text-2xl">Join us in {displayConference.location} | {displayConference.date}</CardTitle>
          <CardDescription>
            Our annual conference brings together the brightest minds from across the globe. Present your work, network with peers, and learn from leading experts in your field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{displayConference.description}</p>
        </CardContent>
        <CardFooter>
          <Button size="lg">Register Now</Button>
          <Button variant="outline" className="ml-4">Call for Papers</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
