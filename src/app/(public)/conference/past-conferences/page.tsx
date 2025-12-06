
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getConferences } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { getCurrentDateInIndia } from "@/lib/utils";

export default function PastConferencesPage() {
  const [pastConferences, setPastConferences] = useState<Conference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAndFilterConferences = useCallback(async () => {
    setIsLoading(true);
    try {
      const today = getCurrentDateInIndia();
      const allConferences = await getConferences();
      const past = allConferences.filter(
        (conf) =>
          conf.dateObject &&
          conf.dateObject.getTime() < today.getTime()
      );

      setPastConferences(
        past.sort(
          (a, b) => b.dateObject!.getTime() - a.dateObject!.getTime()
        )
      );
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
    <div className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Past Conferences
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our archive of past conferences.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
            <Logo className="h-32 w-32" />
        </div>
      ) : pastConferences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastConferences.map((conference) => (
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
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
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
            No past conferences found in the archive yet.
          </p>
        </div>
      )}
    </div>
  );
}
