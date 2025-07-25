// src/app/(public)/conference/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getConferenceById } from "@/services/conferenceService";
import type { Conference } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Calendar, MapPin, Users, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ConferenceDetailPage({ params }: { params: { id: string } }) {
  const [conference, setConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const conferenceId = params.id;

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

  return (
    <div className="bg-secondary/50">
        <div className="container py-12 md:py-24">
            <header className="mb-8">
                <Badge variant="secondary" className="mb-2">{conference.conferenceType}</Badge>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{conference.title}</h1>
                <p className="mt-4 text-lg text-muted-foreground">{conference.description}</p>
            </header>

            <div className="relative w-full h-[400px] mb-12">
                <Image 
                    src={conference.imageSrc} 
                    alt={conference.title} 
                    fill 
                    className="object-cover rounded-xl shadow-lg"
                    data-ai-hint="conference event"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>About the Conference</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{conference.fullDescription}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Submission Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {conference.callForPapers ? (
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Call for Papers is Open</h4>
                                        <p className="text-sm text-muted-foreground">Submission Deadline: {conference.submissionDeadline}</p>
                                    </div>
                                </div>
                           ) : (
                               <p className="text-muted-foreground">The call for papers for this conference has closed.</p>
                           )}
                           <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary flex-shrink-0"/>
                                <p className="text-sm text-muted-foreground">
                                    {conference.enableAbstractSubmission ? "Abstract submissions are accepted." : "Abstract submissions are not accepted."}
                                </p>
                           </div>
                           <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary flex-shrink-0"/>
                                <p className="text-sm text-muted-foreground">
                                    {conference.enableFullPaperSubmission ? "Full paper submissions are accepted." : "Full paper submissions are not accepted."}
                                </p>
                           </div>
                        </CardContent>
                    </Card>

                </main>
                <aside className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">Date</p>
                                    <p className="text-sm text-muted-foreground">{conference.date}</p>
                                </div>
                            </div>
                            <Separator />
                             <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{conference.locationType}</p>
                                    <p className="text-sm text-muted-foreground">{conference.location}</p>
                                </div>
                            </div>
                            <Separator />
                             <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">Audience</p>
                                    <p className="text-sm text-muted-foreground">{conference.audienceType}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Organizer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <p className="font-semibold">{conference.organizerName}</p>
                             <p className="text-sm text-muted-foreground">Email: {conference.organizerEmail}</p>
                             <p className="text-sm text-muted-foreground">Phone: {conference.organizerPhone}</p>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    </div>
  );
}
