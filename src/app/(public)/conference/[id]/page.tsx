// src/app/(public)/conference/[id]/page.tsx
"use client";

import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { getConferenceById } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Calendar, MapPin, Download, CheckCircle, ChevronRight, FileText, Award, Info, Users, Mic, BookOpen, FileQuestion, Banknote, Hotel, Clock, ListTree, Presentation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ConferenceCountdown from "@/components/ui/conference-countdown";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RenderHtmlContent } from "@/components/ui/render-html-content";

interface ConferenceDetailClientProps {
    conferenceId: string;
}

function ConferenceDetailClient({ conferenceId }: ConferenceDetailClientProps) {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
  
  const renderTracksAsCards = (text?: string) => {
    if (!text) return <p className="text-muted-foreground">Not available.</p>;
    
    if (typeof window === 'undefined') {
        return <p className="text-muted-foreground">Loading...</p>;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const items = Array.from(doc.body.children).map(element => element.textContent?.trim()).filter(Boolean);

    if (items.length === 0) return <p className="text-muted-foreground">Not available.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-primary/10 to-secondary/50 group rounded-lg p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-primary/20 border border-transparent">
            <div className="p-2 bg-white rounded-md shadow-inner">
              <ListTree className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            </div>
            <span className="font-medium text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>
    );
  };
  
  const renderRichContent = (htmlContent?: string) => {
    if (!htmlContent) return <p className="text-muted-foreground">Not available.</p>;
    return (
        <div 
          className="prose prose-sm prose-img:w-full max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
    );
  };

  const RenderCommittee = ({ htmlContent }: { htmlContent?: string }) => {
    if (!htmlContent) return <p className="text-muted-foreground">Not available.</p>;
    if (typeof window === 'undefined') {
      return <p className="text-muted-foreground">Loading...</p>;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const members: { src: string; name: string }[] = [];
    
    const elements = Array.from(doc.body.children);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.tagName.toLowerCase() === 'figure' && element.querySelector('img')) {
            const src = element.querySelector('img')!.src;
            let name = '';
            
            // Look for the next element that is a paragraph
            if (i + 1 < elements.length && elements[i + 1].tagName.toLowerCase() === 'p') {
                name = elements[i + 1].textContent?.trim() || '';
                i++; // Increment to skip the name paragraph in the next iteration
            }
            
            if (src && name) {
                members.push({ src, name });
            }
        }
    }

    if (members.length > 0) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {members.map((member, index) => (
            <Card key={index} className="text-center group flex flex-col items-center p-4 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg">
                    <Image
                        src={member.src}
                        alt={member.name}
                        data-ai-hint="person portrait"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
                <CardContent className="p-0">
                    <h4 className="font-semibold text-sm text-foreground tracking-tight">{member.name}</h4>
                </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  
    // Fallback if no image-name pairs are found
    return <RenderHtmlContent htmlContent={htmlContent} />;
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

  const EyecatchyCard = ({ icon: Icon, title, children, className }: { icon: React.ElementType, title?: string, children: React.ReactNode, className?: string }) => (
    <Card className={cn("hover:shadow-xl transition-shadow duration-300 group bg-gradient-to-br from-white via-white to-secondary/20 border-border/50", className)}>
        {title && (
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                       <Icon className="h-5 w-5 text-primary transition-transform duration-500 group-hover:scale-125 group-hover:animate-dance" />
                    </div>
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className={cn(!title && "pt-6")}>{children}</CardContent>
    </Card>
  );

  const ImportantDates = () => {
    const dates = [
      { label: "Abstract Submission Deadline", value: conference.submissionEndDate },
      { label: "Full Paper Submission Deadline", value: conference.fullPaperSubmissionDeadline },
      { label: "Registration Deadline", value: conference.registrationDeadline },
    ].filter(d => d.value);

    if (dates.length === 0) return null;

    return (
      <Card className="group">
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"/>Important Dates</CardTitle></CardHeader>
          <CardContent className="text-sm">
              <table className="w-full">
                  <tbody>
                      {dates.map((d, index) => (
                          <tr key={d.label} className={index < dates.length - 1 ? "border-b" : ""}>
                              <td className="py-2 font-semibold">{d.label}</td>
                              <td className="py-2 text-right text-muted-foreground whitespace-nowrap">{d.value ? format(new Date(d.value), "do MMMM yyyy") : ''}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </CardContent>
      </Card>
    );
  }


  return (
    <div className="bg-secondary/30">
       <section className="relative w-full h-[500px] bg-gray-800 text-white">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&h=500&auto-format&fit=crop"
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
                            <Image src={conference.imageSrc || 'https://placehold.co/200x200.png'} alt={`${conference.shortTitle} logo`} width={200} height={200} data-ai-hint="logo brand" className="w-40 h-40 object-contain"/>
                        </div>
                    </div>
                    <div className="md:col-span-8 text-center md:text-left space-y-4">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-amber-400">{conference.title}</h1>
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
                            <Button asChild variant="outline" className="bg-white/90 text-black hover:bg-white text-xs px-3 h-8 md:text-sm md:px-4 md:h-10" disabled={!isCallForPapersOpen}>
                              <Link href="/submit-journal"><FileText /> Abstract Submission</Link></Button>
                            <Button asChild variant="outline" className="bg-white/90 text-black hover:bg-white text-xs px-3 h-8 md:text-sm md:px-4 md:h-10" disabled={!conference.paperTemplateUrl}>
                                <a href={conference.paperTemplateUrl} target="_blank" rel="noopener noreferrer"><Download /> Download Brochure</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center md:justify-start lg:justify-end pt-4">
                <ConferenceCountdown targetDate={conference.startDate} />
            </div>
        </div>
      </section>
      
      <div className="py-12 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
            <main className="lg:col-span-2 space-y-6">
                <EyecatchyCard icon={Users}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-primary/80 transition-transform duration-300 group-hover:animate-dance"/>About the Conference</h3>
                            <Separator className="my-2 bg-primary/20 animate-width-pulse" />
                            <div className="pt-4">
                                {renderRichContent(conference.aboutConference)}
                            </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full space-y-2 pt-6">
                            <AccordionItem value="item-1" className="bg-gradient-to-tr from-secondary/50 to-secondary/20 rounded-lg px-4 border-b-0">
                                <AccordionTrigger className="hover:no-underline">Keynote Speakers</AccordionTrigger>
                                <AccordionContent>
                                    <RenderCommittee htmlContent={conference.keynoteSpeakers} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="bg-gradient-to-tr from-secondary/50 to-secondary/20 rounded-lg px-4 border-b-0">
                                <AccordionTrigger className="hover:no-underline">Organizing Committee</AccordionTrigger>
                                <AccordionContent>
                                    <RenderCommittee htmlContent={conference.organizingCommittee} />
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-4" className="bg-gradient-to-tr from-secondary/50 to-secondary/20 rounded-lg px-4 border-b-0">
                                <AccordionTrigger className="hover:no-underline">Editorial Board Members / Track Chairs</AccordionTrigger>
                                <AccordionContent>
                                    {renderRichContent(conference.editorialBoard)}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="bg-gradient-to-tr from-secondary/50 to-secondary/20 rounded-lg px-4 border-b-0">
                                <AccordionTrigger className="hover:no-underline">Conference Tracks</AccordionTrigger>
                                <AccordionContent>
                                    {renderTracksAsCards(conference.tracks)}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        <div className="pt-6">
                             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-primary/80 transition-transform duration-300 group-hover:animate-dance"/>Submission Guidelines</h3>
                              <Separator className="my-2 bg-primary/20 animate-width-pulse" />
                             <div className="space-y-4 pt-4">
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
                                    {conference.submissionInstructions && <div><strong className="text-foreground">Instructions:</strong>{renderRichContent(conference.submissionInstructions)}</div>}
                                    {conference.paperTemplateUrl && <Button asChild variant="link" className="p-0 h-auto"><a href={conference.paperTemplateUrl} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-4 w-4"/>Download Paper Template</a></Button>}
                               </div>
                            </div>
                        </div>
                        {conference.registrationFees && (
                            <div className="pt-6">
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Banknote className="h-5 w-5 text-primary/80 transition-transform duration-300 group-hover:animate-dance"/>Registration &amp; Fees</h3>
                                <Separator className="my-2 bg-primary/20 animate-width-pulse" />
                                <div className="pt-4">
                                    {renderRichContent(conference.registrationFees)}
                                </div>
                            </div>
                        )}
                        {conference.accommodationDetails && (
                            <div className="pt-6">
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Hotel className="h-5 w-5 text-primary/80 transition-transform duration-300 group-hover:animate-dance"/>Accommodation</h3>
                                 <Separator className="my-2 bg-primary/20 animate-width-pulse" />
                                <div className="pt-4">
                                  {renderRichContent(conference.accommodationDetails)}
                                </div>
                            </div>
                        )}
                    </div>
                </EyecatchyCard>
            </main>
            <aside className="space-y-6 sticky top-24 self-start">
                <Card>
                    <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3"><Calendar className="h-5 w-5 text-primary flex-shrink-0 animate-pulse" /><div><p className="font-semibold">Date</p><p className="text-sm text-muted-foreground">{conference.date}</p></div></div>
                        <Separator />
                        <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary flex-shrink-0 animate-pulse" /><div><p className="font-semibold">Venue</p><p className="text-sm text-muted-foreground">{conference.venueName}<br />{conference.location}</p></div></div>
                         {conference.keywords && <>
                            <Separator />
                            <div><p className="font-semibold mb-2">Keywords</p><div className="flex flex-wrap gap-1">{conference.keywords.split(',').map((k, index) => k.trim() && <Badge key={`${k.trim()}-${index}`} variant="secondary">{k.trim()}</Badge>)}</div></div>
                        </>}
                    </CardContent>
                </Card>
                <ImportantDates />
            </aside>
        </div>
      </div>
      
    </div>
  );
}

interface ConferenceDetailPageProps {
  params: { id: string };
}

export default function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const LoadingSkeleton = () => (
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

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ConferenceDetailClient conferenceId={params.id as string} />
    </Suspense>
  );
}
