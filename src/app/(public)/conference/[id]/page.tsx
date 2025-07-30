
// src/app/(public)/conference/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getConferenceById } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Calendar, MapPin, Download, CheckCircle, ChevronRight, FileText, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ConferenceCountdown from "@/components/ui/conference-countdown";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ConferenceDetailPage() {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const params = useParams();
  const conferenceId = params.id as string;

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
      <ul className="list-disc list-inside text-muted-foreground space-y-1 break-words">
        {text.split('\n').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}
      </ul>
    );
  };

  const renderParagraphs = (text?: string) => {
    if (!text) return <p className="text-muted-foreground">Not available.</p>;
    return (
        <div className="text-muted-foreground whitespace-pre-wrap space-y-2 break-words">
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
    <div className="bg-secondary/30">
       <section className="relative w-full h-[500px] bg-gray-800 text-white">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=500&auto=format&fit=crop"
          alt="Conference background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="conference audience"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-8">
            <div>
              <div className="flex items-center text-sm text-white/80">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <Link href="/conference" className="hover:text-white">Conferences</Link>
                   <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="font-semibold text-white">{conference.shortTitle}</span>
              </div>
            </div>

            <div className="flex-grow flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <Image src={conference.imageSrc} alt={`${conference.shortTitle} logo`} width={200} height={200} data-ai-hint="logo brand" className="w-40 h-40 object-contain"/>
                        </div>
                    </div>
                    <div className="md:col-span-8 text-center md:text-left space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-amber-400">{conference.title}</h1>
                        <div className="inline-flex items-center gap-4 bg-white/90 text-black px-4 py-2 rounded-full font-semibold text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span>{conference.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary"/>
                                <span>{conference.location}</span>
                            </div>
                        </div>
                         <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                            <Button asChild variant="outline" className="bg-white/90 text-black hover:bg-white" disabled={!isCallForPapersOpen}>
                              <Link href="/submit-journal"><FileText /> Abstract Submission</Link>
                            </Button>
                            <Button asChild variant="outline" className="bg-white/90 text-black hover:bg-white" disabled={!conference.paperTemplateUrl}>
                                <a href={conference.paperTemplateUrl} target="_blank" rel="noopener noreferrer"><Download /> Download Brochure</a>
                            </Button>
                            <Button asChild variant="outline" className="bg-white/90 text-black hover:bg-white" disabled={!conference.conferenceWebsite}>
                                <a href={conference.conferenceWebsite} target="_blank" rel="noopener noreferrer"><Award /> Registration</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <ConferenceCountdown targetDate={conference.startDate} />
            </div>
        </div>
      </section>

      <div className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
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
                            <div><p className="font-semibold mb-2">Keywords</p><div className="flex flex-wrap gap-1">{conference.keywords.split(',').map((k, index) => k.trim() && <Badge key={`${k.trim()}-${index}`} variant="secondary">{k.trim()}</Badge>)}</div></div>
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
