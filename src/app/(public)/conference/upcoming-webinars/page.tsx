
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useToast } from "@/hooks/use-toast";
import { getCurrentDateInIndia } from "@/lib/utils";
import Image from "next/image";
import { Logo } from "@/components/icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/forms/contact-form";
import { ScrollArea } from "@/components/ui/scroll-area";

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
             <div className="flex items-center justify-center py-24">
                <Logo className="h-32 w-32" />
             </div>
        ) : upcomingWebinars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="ft-recipe w-full max-w-sm mx-auto">
                    <div className="ft-recipe__thumb">
                        <Image src={webinar.imageSrc} alt={webinar.title} fill className="object-cover" data-ai-hint="webinar event" />
                    </div>
                    <div className="ft-recipe__content">
                        <CardHeader className="p-0">
                            <CardTitle className="recipe-title">{webinar.title}</CardTitle>
                             <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{webinar.date}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow pt-4">
                            <p className="text-muted-foreground line-clamp-4">{webinar.description}</p>
                        </CardContent>
                        <CardFooter className="p-0 content__footer">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        Register Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                                  <DialogHeader>
                                    <DialogTitle>Register for: {webinar.title}</DialogTitle>
                                    <DialogDescription>
                                      Please fill out your details below to register for the webinar.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex-grow overflow-y-auto pr-6 -mr-2">
                                      <ScrollArea className="h-full">
                                          <ContactForm 
                                            inquiryType="Webinar Registration"
                                            details={webinar.title}
                                          />
                                      </ScrollArea>
                                  </div>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </div>
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
