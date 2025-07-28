
// src/app/(public)/conference/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { getConferenceById } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Calendar, MapPin, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function ConferenceDetailPage({ params }: { params: { id: string } }) {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const conferenceId = use(params).id;

  useEffect(() => {
    const fetchConference = async () => {
      if (!conferenceId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const result = await getConferenceById(conferenceId);
        if (result.success && result.conference) {
          setConference(result.conference);
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch conference details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConference();
  }, [conferenceId, toast]);

  if (isLoading) {
    return (
      <div className="container py-12 md:py-24">
        <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="grid md:grid-cols-3 gap-8 pt-8">
                <div className="md:col-span-2 space-y-6">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (!conference) {
    return (
      <div className="container py-12 md:py-24 text-center">
        <h1 className="text-2xl font-bold">Conference Not Found</h1>
        <p className="text-muted-foreground mt-2">The conference you are looking for does not exist or could not be loaded.</p>
      </div>
    );
  }

  const renderListFromString = (text?: string) => {
    if (!text) return <p className="text-muted-foreground">Not available.</p>;
    return (
      <ul className="list-disc list-inside text-muted-foreground space-y-1">
        {text.split('\n').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}
      </ul>
    );
  };

  const renderParagraphs = (text?: string) => {
    if (!text) return <p className="text-muted-foreground">Not available.</p>;
    return (
        <div className="text-muted-foreground whitespace-pre-wrap space-y-2">
            {text.split('\n').map((para, index) => para.trim() && <p key={index}>{para.trim()}</p>)}
        </div>
    );
  };
  
  const getPaperCategoryLabel = (id: string) => {
    const map: { [key: string]: string } = {
        "full_paper": "Full Paper",
        "abstract": "Abstract",
        "poster": "Poster",
        "case_study": "Case Study",
    };
    return map[id] || id;
  }

  const today = new Date();
  const submissionEndDate = new Date(conference.submissionEndDate);
  const isCallForPapersOpen = submissionEndDate >= today;


  return (
    <div className="bg-secondary/50">
        <div className="container py-12 md:py-24">
            <header className="mb-8 md:mb-12 text-center">
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {conference.modeOfConference.map(mode => (
                        <Badge key={mode} variant="secondary" className="capitalize text-sm py-1 px-3">{mode}</Badge>
                    ))}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{conference.title} ({conference.shortTitle})</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{conference.tagline || conference.description}</p>
            </header>

            <div className="relative w-full h-[300px] md:h-[450px] mb-12">
                <Image 
                    src={conference.imageSrc} 
                    alt={conference.title} 
                    fill 
                    className="object-cover rounded-xl shadow-lg"
                    data-ai-hint="conference event"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <main className="lg:col-span-2 space-y-8">
                    <Card><CardHeader><CardTitle>About the Conference</CardTitle></CardHeader><CardContent>{renderParagraphs(conference.aboutConference)}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Keynote Speakers</CardTitle></CardHeader><CardContent>{renderListFromString(conference.keynoteSpeakers)}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Organizing Committee</CardTitle></CardHeader><CardContent>{renderListFromString(conference.organizingCommittee)}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Conference Tracks</CardTitle></CardHeader><CardContent>{renderListFromString(conference.tracks)}</CardContent></Card>
                    
                     <Card>
                        <CardHeader><CardTitle>Submission Guidelines</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           {isCallForPapersOpen ? (
                                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Call for Papers is Open</h4>
                                        <p className="text-sm text-muted-foreground">Submission Deadline: {format(new Date(conference.submissionEndDate), "PPP")}</p>
                                    </div>
                                </div>
                           ) : (
                               <p className="text-muted-foreground">The call for papers for this conference has closed.</p>
                           )}
                           <div className="text-sm text-muted-foreground space-y-3">
                                <p><strong>Submission Dates:</strong> {format(new Date(conference.submissionStartDate), "PPP")} to {format(new Date(conference.submissionEndDate), "PPP")}</p>
                                <div><strong>Accepted Categories:</strong> <div className="flex flex-wrap gap-2 mt-1">{conference.paperCategories.map(cat => <Badge key={cat} variant="outline">{getPaperCategoryLabel(cat)}</Badge>)}</div></div>
                                {conference.peerReviewMethod && <p><strong>Review Method:</strong> {conference.peerReviewMethod}</p>}
                                {conference.submissionInstructions && <div><strong className="text-foreground">Instructions:</strong>{renderParagraphs(conference.submissionInstructions)}</div>}
                                {conference.paperTemplateUrl && <Button asChild variant="link" className="p-0 h-auto"><a href={conference.paperTemplateUrl} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-4 w-4"/>Download Paper Template</a></Button>}
                           </div>
                        </CardContent>
                    </Card>
                    
                    {conference.registrationFees && <Card><CardHeader><CardTitle>Registration & Fees</CardTitle></CardHeader><CardContent>{renderParagraphs(conference.registrationFees)}</CardContent></Card>}
                    {conference.accommodationDetails && <Card><CardHeader><CardTitle>Accommodation</CardTitle></CardHeader><CardContent>{renderParagraphs(conference.accommodationDetails)}</CardContent></Card>}

                    {conference.faqs && (
                        <Card>
                            <CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {conference.faqs.split('\n').filter(faq => faq.includes('?')).map((faq, index) => {
                                        const [question, ...answerParts] = faq.split('?');
                                        const answer = answerParts.join('?').trim();
                                        return (
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger>{question}?</AccordionTrigger>
                                                <AccordionContent>{answer}</AccordionContent>
                                            </AccordionItem>
                                        );
                                    })}
                                </Accordion>
                            </CardContent>
                        </Card>
                    )}
                </main>
                <aside className="space-y-6 sticky top-24 self-start">
                    <Card>
                        <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3"><Calendar className="h-5 w-5 text-primary flex-shrink-0" /><div><p className="font-semibold">Date</p><p className="text-sm text-muted-foreground">{conference.date}</p></div></div>
                            <Separator />
                            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary flex-shrink-0" /><div><p className="font-semibold">Venue</p><p className="text-sm text-muted-foreground">{conference.venueName}<br />{conference.location}</p></div></div>
                             {conference.keywords && <>
                                <Separator />
                                <div><p className="font-semibold mb-2">Keywords</p><div className="flex flex-wrap gap-1">{conference.keywords.split(',').map(k => k.trim() && <Badge key={k} variant="secondary">{k.trim()}</Badge>)}</div></div>
                            </>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Contact & Links</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           {conference.conferenceEmail && <><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground break-all">{conference.conferenceEmail}</p></>}
                           {conference.conferenceWebsite && <><Separator /><p className="font-semibold">Website</p><a href={conference.conferenceWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">{conference.conferenceWebsite}</a></>}
                        </CardContent>
                    </Card>
                    {conference.editorialBoard && <Card><CardHeader><CardTitle>Editorial Board</CardTitle></CardHeader><CardContent>{renderListFromString(conference.editorialBoard)}</CardContent></Card>}
                </aside>
            </div>
        </div>
    </div>
  );
}
