
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, History } from "lucide-react";
import { useEffect, useState } from "react";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";
import { Logo } from "@/components/icons";

export default function PastWebinarsPage() {
  const [pastWebinars, setPastWebinars] = useState<Webinar[]>([]);
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
        const past = allWebinars
          .filter(webinar => webinar.dateObject && webinar.dateObject.getTime() < currentDate.getTime())
          .sort((a, b) => b.dateObject.getTime() - a.dateObject.getTime());
        setPastWebinars(past);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch past webinars.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterWebinars();
  }, [currentDate, toast]);

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Past Webinars</h1>
        <p className="mt-4 text-lg text-muted-foreground">Catch up on webinars you may have missed.</p>
      </div>

       {isLoading ? (
        <div className="flex items-center justify-center py-24">
            <Logo className="h-32 w-32" />
        </div>
      ) : pastWebinars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastWebinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-col w-full max-w-sm overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image src={webinar.imageSrc} alt={webinar.title} fill className="object-cover" data-ai-hint="webinar event" />
              </div>
              <CardHeader>
                <CardTitle>{webinar.title}</CardTitle>
                <div className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{webinar.date}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-muted-foreground line-clamp-3">{webinar.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <History className="mr-2 h-4 w-4" />
                  Watch Recording
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No past webinars found in the archive yet.</p>
        </div>
      )}
    </div>
  );
}
