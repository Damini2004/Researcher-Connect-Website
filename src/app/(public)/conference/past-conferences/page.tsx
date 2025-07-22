
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, History } from "lucide-react";
import { useEffect, useState } from "react";
import { getConferences, Conference } from "@/services/conferenceService";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function PastConferencesPage() {
  const [pastConferences, setPastConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndFilterConferences = async () => {
      setIsLoading(true);
      try {
        const allConferences = await getConferences();
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Set to start of today for comparison

        const past = allConferences.filter(conf => {
            // Use the reliable dateObject for comparison
            return conf.dateObject < now;
        });

        setPastConferences(past);
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
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Past Conferences</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explore our archive of past conferences.</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <Skeleton className="h-[200px] w-full rounded-t-lg" />
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-1/2" />
                           <Skeleton className="h-4 w-1/3" />
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-32" />
                    </CardFooter>
                </Card>
            ))}
        </div>
      ) : pastConferences.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastConferences.map((conference) => (
            <Card key={conference.id} className="flex flex-col">
              <div className="relative h-[200px] w-full">
                <Image src={conference.imageSrc} alt={conference.title} fill className="object-cover rounded-t-lg" data-ai-hint="conference event"/>
              </div>
              <CardHeader>
                <CardTitle>{conference.title}</CardTitle>
                <div className="flex flex-col text-sm text-muted-foreground gap-2 pt-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4"/>
                        <span>{conference.date}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4"/>
                        <span>{conference.location}</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{conference.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                    <History className="mr-2 h-4 w-4" />
                    View Archive
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">No past conferences found in the archive yet.</p>
        </div>
      )}
    </div>
  );
}
