
// src/components/publications/publications-page-content.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getJournals, Journal } from "@/services/journalService";
import { getWebinars, Webinar } from "@/services/webinarService";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/forms/contact-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentDateInIndia } from "@/lib/utils";

export default function PublicationsPageContent() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const today = getCurrentDateInIndia();
      const journalsData = getJournals();
      const webinarsData = getWebinars();

      const [journalsResult, allWebinars] = await Promise.all([journalsData, webinarsData]);
      
      setJournals(journalsResult);
      
      const upcoming = allWebinars
        .filter(webinar => webinar.dateObject && webinar.dateObject.getTime() >= today.getTime())
        .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
      setUpcomingWebinars(upcoming);

    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch publications data.",
        variant: "destructive",
      });
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const filteredJournals = journals.filter(journal =>
    journal.journalName.toLowerCase().includes(filter.toLowerCase()) ||
    journal.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-12 md:py-24 px-4 md:px-6 space-y-16">
      <section id="journals">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Journals</h1>
            <p className="mt-4 text-lg text-muted-foreground">Browse through the latest research published with Researcher Connect.</p>
            <div className="relative mt-6 max-w-lg mx-auto">
            <Input 
                placeholder="Search journals by title or description..." 
                className="pl-10 h-12"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </div>

        {isLoading ? (
            <div className="flex items-center justify-center py-24">
                <Logo className="h-32 w-32" />
            </div>
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJournals.map(journal => (
                    <Card key={journal.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
                        <Image 
                            src={journal.imageSrc}
                            alt={`Cover for ${journal.journalName}`}
                            width={400}
                            height={300}
                            data-ai-hint="journal cover"
                            className="w-full object-cover aspect-[4/3]"
                        />
                        <div className="flex flex-col flex-grow">
                            <CardHeader>
                                <CardTitle className="text-xl leading-snug">{journal.journalName}</CardTitle>
                                <CardDescription className="pt-1 line-clamp-2">{journal.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-2">
                                <p className="text-sm text-muted-foreground">Status: {journal.status}</p>
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    Read more...
                                </Link>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="secondary" className="w-full">
                                    <Link href="#">
                                        View Journal <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                    ))}
                </div>
                {filteredJournals.length > 0 && (
                    <div className="mt-12 text-center">
                        <Button size="lg" variant="outline">Load More Journals</Button>
                    </div>
                )}
                {filteredJournals.length === 0 && !isLoading && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>No journals found matching your search criteria.</p>
                    </div>
                )}
            </>
        )}
      </section>

      <section id="webinars">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Upcoming Webinars</h1>
            <p className="mt-4 text-lg text-muted-foreground">Join our expert-led sessions to stay updated on the latest research and trends.</p>
        </div>
        {isLoading ? (
            <div className="flex items-center justify-center py-24">
                <Logo className="h-32 w-32" />
            </div>
        ) : upcomingWebinars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="flex flex-col w-full max-w-sm mx-auto overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative h-[200px] w-full">
                        <Image src={webinar.imageSrc} alt={webinar.title} fill className="object-cover" data-ai-hint="webinar event" />
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle>{webinar.title}</CardTitle>
                            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{webinar.date}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow">
                            <p className="text-muted-foreground line-clamp-4">{webinar.description}</p>
                        </CardContent>
                        <CardFooter className="p-0 mt-6 flex flex-col items-start gap-3">
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
            <div className="text-center py-16 text-muted-foreground">
                <p>There are no upcoming webinars at the moment. Please check back later!</p>
            </div>
        )}
      </section>
    </div>
  );
}
