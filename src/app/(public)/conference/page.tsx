
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
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getCurrentDateInIndia } from "@/lib/utils";

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
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Upcoming Conferences
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our upcoming conferences and events.
        </p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col w-full overflow-hidden">
              <Skeleton className="h-[200px] w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : upcomingConferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingConferences.map((conference) => (
            <Card key={conference.id} className="flex flex-col w-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-[200px] w-full">
                <Image src={conference.imageSrc || "https://placehold.co/400x200.png"} alt={conference.title} fill className="object-cover" data-ai-hint="conference event" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <CardHeader className="p-0">
                  <CardTitle>{conference.title}</CardTitle>
                  <div className="flex flex-col text-sm text-muted-foreground gap-2 pt-2">
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
                <CardContent className="p-0 pt-4 flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {conference.description}
                  </p>
                </CardContent>
                <CardFooter className="p-0 pt-6">
                  <Button asChild>
                    <Link href={`/conference/${conference.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No upcoming conferences found. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}
